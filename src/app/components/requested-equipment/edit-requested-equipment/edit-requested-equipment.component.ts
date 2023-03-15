import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlContainer, NgControl, NgModelGroup} from '@angular/forms';
import {RequestedEquipment, WeightUnit} from '../../../../../projects/bkg-swagger-client';
import {Globals} from '../../../models/globals';
import {StaticDataService} from '../../../services/static-data.service';
import {clearValidationIssuesOnNgControl} from '../../../util/validation-util';
import {Observable} from 'rxjs';
import {SelectItem} from 'primeng/api/selectitem';

@Component({
  selector: 'app-edit-requested-equipment',
  templateUrl: './edit-requested-equipment.component.html',
  styleUrls: ['./edit-requested-equipment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    },
  ]
})
export class EditRequestedEquipmentComponent {
  @Input()
  requestedEquipment?: RequestedEquipment;

  @Output()
  requestedEquipmentChange = new EventEmitter<RequestedEquipment>();

  weightUnits$: Observable<SelectItem<WeightUnit|null>[]>;

  tareWeight?: number;
  tareWeightUnit?: WeightUnit;

  constructor(private staticDataService: StaticDataService,
              private globals: Globals,
  ) {
    this.weightUnits$ = staticDataService.getWeightUnitSelectItems();
  }

  get supportNonISO6346References(): boolean {
    return this.globals.config?.features?.supportNonISO6346References ?? false
  }

  addEquipmentReference():void {
    const requestedEquipment = this.requestedEquipment;
    if (!requestedEquipment) {
      return;
    }
    requestedEquipment.equipmentReferences ??= [];
    requestedEquipment.equipmentReferences.push('');
  }

  removeEquipmentReference(j: number, ngControl: NgControl) {
    const equipmentReferences = this.requestedEquipment?.equipmentReferences;
    if (!equipmentReferences) {
      return;
    }
    equipmentReferences.splice(j, 1);
    clearValidationIssuesOnNgControl(ngControl);
  }

  trackEquipmentReferenceBy<U extends T, T>(index: number, _: T & U): any {
    return index;
  }

  triState(value?: boolean|null): string {
    if (value === undefined || value === null) {
      return 'unset'
    }
    return value ? 'yes' : 'no';
  }

  onSOCChange(): void {
    const requestedEquipment = this.requestedEquipment;
    if (!requestedEquipment) {
      return;
    }
    if (requestedEquipment.isShipperOwned) {
      requestedEquipment.tareWeight = this.tareWeight;
      requestedEquipment.tareWeightUnit = this.tareWeightUnit;
    } else {
      this.tareWeight = requestedEquipment.tareWeight;
      this.tareWeightUnit = requestedEquipment.tareWeightUnit;
      requestedEquipment.tareWeight = undefined;
      requestedEquipment.tareWeightUnit = undefined;
    }
  }
}
