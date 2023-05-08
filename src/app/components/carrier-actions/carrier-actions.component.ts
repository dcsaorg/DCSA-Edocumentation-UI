import {Component} from '@angular/core';
import {BookingService} from '../../services/booking.service';
import {catchError, map, Observable, of, ReplaySubject, switchMap, take, tap} from 'rxjs';
import {CarrierActionService} from '../../services/carrier-action.service';
import {TransportDocumentService} from '../../services/transport-document.service';
import {MessageService} from 'primeng/api';
import {ShippingInstructionService} from '../../services/shipping-instruction.service';
import {CarrierService} from '../../services/carrier.service';
import {Party, PartyContactDetail} from '../../../../projects/bkg-swagger-client';
import {Carrier} from '../../models/carrier';
import {IssueTDDraftRequest} from '../../models/carrier-action';

enum CarrierAction {
  CONFIRM_BOOKING = 'confirm-booking',
  ISSUE_DRAFT_TD = 'issue-draft-td',
  ISSUE_TD = 'issue-td',
}

interface DocumentSummary {
  documentReference: string;
  documentStatus: string;
  documentTypeName: string;
  issuesWithTheDocument?: string[];
}

interface LoadDocumentRequest {
  carrierActionOption: CarrierActionOption;
  documentReference: string;
}

interface CarrierActionOption {
  label: string;
  value: {
    actionType: CarrierAction;
    documentTypeName: string;
    loadDocument: (ref: string) => Observable<DocumentSummary>;
  }
}

interface DocumentStatusUpdate {
  documentReference: string;
  documentStatus: string;
}

interface IssuingTDFormDetails {
  shippingInstructionReference: string;
  issuingTDDraftParty: Carrier | null;
  partyContactDetail: PartyContactDetail;
  shippedOnBoardDate?: Date | null;
  receivedForShipmentDate?: Date | null;
}

class DocumentStatusUpdate implements DocumentStatusUpdate {

  constructor(referenceKey: string, payload: any) {
    this.documentReference = payload[referenceKey];
    this.documentStatus = payload.documentStatus;
  }
}

function checkDocumentStatus(status: string, allowedStatuses: string|string[], issues: string[], targetState?: string) {
  let hasCorrectStatus : boolean;
  let message: string;
  if (typeof allowedStatuses === 'string') {
    hasCorrectStatus = status === allowedStatuses;
    message = `Document had status ${status} but should have been one: ${allowedStatuses}`
  } else {
    hasCorrectStatus = allowedStatuses.includes(status);
    message = `Document had status ${status} but should have been one of: ${allowedStatuses.join(', ')}`
  }

  if (status === targetState) {
    message = `Document already has status ${status}`
  }

  if (!hasCorrectStatus) {
    issues.push(message);
  }

}

@Component({
  selector: 'app-carrier-actions',
  templateUrl: './carrier-actions.component.html',
  styleUrls: ['./carrier-actions.component.scss']
})
export class CarrierActionsComponent {

  constructor(private bookingService: BookingService,
              private shippingInstructionService: ShippingInstructionService,
              private transportDocumentService: TransportDocumentService,
              private carrierService: CarrierService,
              private messageService: MessageService,
              private carrierActionService: CarrierActionService) {
  }

  readonly CarrierAction = CarrierAction;

  selectedCarrierActionOption: CarrierActionOption | null = null;
  documentReference: string | null = null;
  loadingDocument: boolean = false;
  submittingAction: boolean = false;

  documentStatusUpdate: DocumentStatusUpdate | null = null;
  newDocumentIssued: boolean = false;
  documentNeedsReload: boolean = false;

  issuers$ = this.carrierService.getReferenceCarriers();

  issuingTDDetails: IssuingTDFormDetails = {
    shippingInstructionReference: '',
    issuingTDDraftParty: null,
    partyContactDetail: {
      name: '',
      email: '',
      phone: ''
    }
  };


  private readonly loadDocumentRequest = new ReplaySubject<LoadDocumentRequest>();

  documentSummary$: Observable<DocumentSummary> = this.loadDocumentRequest.pipe(
    switchMap(loadRequest => loadRequest.carrierActionOption.value.loadDocument(loadRequest.documentReference).pipe(
        catchError((err, _) => {
          let msg = `Could not load the document with reference ${loadRequest.documentReference} due to an unknown error`;
          let documentStatus = 'ERROR';
          if (err.name === 'HttpErrorResponse') {
            msg = `Could not load the document with reference ${loadRequest.documentReference} due to API returning HTTP code ${err.status}`;
            if (err.status === 503) {
              documentStatus = 'EHOSTDOWN';
              msg = 'The API / backend is temporarily unavailable (HTTP code 503)'
            } else if (err.status >= 500) {
              documentStatus = 'EHOSTDOWN';
              msg = `The API / backend was unreachable/down (HTTP code ${err.status})`
            } else if (err.status === 404) {
              documentStatus = 'ENOENT';
              msg = `No ${loadRequest.carrierActionOption.value.documentTypeName} had the document reference ${loadRequest.documentReference}`
            } else if (err.status === 401 || err.status === 403) {
              msg = `Server rejected your credentials or you do not have permission to see the document`
            }
          }
          return of({
            documentReference: loadRequest.documentReference,
            documentStatus: documentStatus,
            documentTypeName: loadRequest.carrierActionOption.value.documentTypeName,
            issuesWithTheDocument: [
              `Could not load the document with reference ${loadRequest.documentReference}: ${msg}`
            ],
          })
        })
      ),
    ),
    tap(documentSummary => {
      if (documentSummary.issuesWithTheDocument !== undefined && documentSummary.issuesWithTheDocument.length < 1) {
        // Normalize field to undefined, which enables us to simplify the template and the loadDocument snippet
        documentSummary.issuesWithTheDocument = undefined;
      }
    }),
    tap(ref => this.issuingTDDetails.shippingInstructionReference = ref.documentReference),
    tap(_ => this.loadingDocument = false),
  );

  carrierOptions: CarrierActionOption[] = [
    {
      label: 'Confirm a booking',
      value: {
        actionType: CarrierAction.CONFIRM_BOOKING,
        documentTypeName: 'Booking Request',
        loadDocument: (ref) => this.bookingService.getBooking(ref).pipe(
          map(booking => {
            const issues: string[] = [];
            checkDocumentStatus(booking.documentStatus, ['RECE', 'PENC'], issues, 'CONF');
            return {
              documentReference: booking.carrierBookingRequestReference,
              documentStatus: booking.documentStatus,
              documentTypeName: 'Booking Request',
              issuesWithTheDocument: issues,
            }
          })
        ),
      }
    },

    {
      label: 'Issue draft transport document',
      value: {
        actionType: CarrierAction.ISSUE_DRAFT_TD,
        documentTypeName: 'Shipping Instruction',
        loadDocument: (ref) => this.shippingInstructionService.getShippingInstruction(ref).pipe(
          map(si => {
            const issues: string[] = [];
            checkDocumentStatus(si.documentStatus, ['RECE'], issues, 'DRFT');
            return {
              documentReference: si.shippingInstructionReference,
              documentStatus: si.documentStatus,
              documentTypeName: 'Shipping Instruction',
              issuesWithTheDocument: issues,
            }
          })
        ),
      }
    },

    {
      label: 'Issue (final) transport document',
      value: {
        actionType: CarrierAction.ISSUE_TD,
        documentTypeName: 'Transport Document',
        loadDocument: (ref) => this.transportDocumentService.getTransportDocument(ref).pipe(
          map(td => {
            const issues: string[] = [];
            checkDocumentStatus(td.shippingInstruction.documentStatus, ['APPR'], issues, 'ISSU');
            return {
              documentReference: td.transportDocumentReference,
              documentStatus: td.shippingInstruction.documentStatus,
              documentTypeName: 'Transport Document',
              issuesWithTheDocument: issues,
            }
          })
        ),
      }
    },
  ]

  maybeLoadDocument() {
    const selectedCarrierActionOption = this.selectedCarrierActionOption;
    const documentReference = this.documentReference;
    if (!selectedCarrierActionOption || !documentReference) {
      return;
    }
    this.loadingDocument = true;
    this.loadDocumentRequest.next({
      documentReference: documentReference,
      carrierActionOption: selectedCarrierActionOption,
    });
  }

  issueDraftTD(documentReference: string) {
    const issuingParty = this.issuingTDDetails.issuingTDDraftParty;
    if (!issuingParty) {
      return;
    }
    const issueRequest: IssueTDDraftRequest = {
      shippingInstructionReference: documentReference,
      issuingParty: {
        partyName: issuingParty.partyName,
        partyContactDetails: [
          this.issuingTDDetails.partyContactDetail,
        ],
        identifyingCodes: issuingParty.identifyingCodes,
      },
      shippedOnBoardDate: this.issuingTDDetails.shippedOnBoardDate ?? undefined,
      receivedForShipmentDate: this.issuingTDDetails.receivedForShipmentDate ?? undefined,
    }
    this.submittingAction = true;
    this.carrierActionService.issueDraftTD(issueRequest).pipe(
      take(1)
    ).subscribe({
      error: (_) => {
        this.submittingAction = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Update failed',
          detail: `Issuance of draft transport document failed.`,
        });
      },
      next: (rawStatusUpdate) => {
        this.documentStatusChangeSuccessful(true, 'transportDocumentReference', rawStatusUpdate);
        this.messageService.add({
          severity: 'success',
          summary: 'Draft issued',
          detail: `The draft transport document was successfully issued with reference ${documentReference}`,
        });
      }
    });
  }

  changeTDState(documentReference: string, newStatus: string, reason?: string) {
    this.submittingAction = true;
    this.carrierActionService.changeTDStatus(documentReference, newStatus, reason).pipe(
      take(1)
    ).subscribe({
      error: (_) => {
        this.submittingAction = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Update failed',
          detail: `Status change of ${documentReference} failed.`,
        });
      },
      next: (rawStatusUpdate) => {
        this.documentStatusChangeSuccessful(false, 'transportDocumentReference', rawStatusUpdate);
        this.messageService.add({
          severity: 'success',
          summary: 'Update successful',
          detail: `Status change of ${documentReference} was successful`,
        });
      }
    });
  }

  documentStatusChangeSuccessful(newDocumentIssued: boolean, referenceKey: string, rawStatusUpdate: any) {
    this.submittingAction = false;
    this.documentNeedsReload = true;
    this.documentStatusUpdate = new DocumentStatusUpdate(referenceKey, rawStatusUpdate);
    this.newDocumentIssued = newDocumentIssued;
  }
}
