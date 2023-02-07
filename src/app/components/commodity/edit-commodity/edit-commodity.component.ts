import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Commodity, VolumeUnit, WeightUnit} from '../../../../../projects/bkg-swagger-client';
import {AbstractFormGroupDirective, ControlContainer, NgModelGroup} from '@angular/forms';
import {StaticDataService} from '../../../services/static-data.service';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {SelectItem} from 'primeng/api/selectitem';
import {createCommodity, createRequestedEquipment} from '../../../util/object-factory';
import {clearValidationIssuesOnFormGroupDirective} from '../../../util/validation-util';

@Component({
  selector: 'app-edit-commodity',
  templateUrl: './edit-commodity.component.html',
  styleUrls: ['./edit-commodity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    }
  ]
})
export class EditCommodityComponent implements OnChanges, OnInit {

  @Input()
  initialCommodity: Commodity|null = null;
  commodity$: BehaviorSubject<Commodity|null> = new BehaviorSubject<Commodity|null>(null);

  weightUnits$: Observable<SelectItem<WeightUnit|null>[]>;
  volumeUnits$: Observable<SelectItem<VolumeUnit|null>[]>;

  requestedEquipmentSelected: boolean[] = [];

  constructor(private staticDataService: StaticDataService,
              ) {
    this.weightUnits$ = staticDataService.getWeightUnitSelectItems();
    this.volumeUnits$ = staticDataService.getVolumeUnitSelectItems();
  }

  ngOnInit(): void {
    this.commodity$.pipe(
      tap(commodity => {
        this.requestedEquipmentSelected = commodity?.requestedEquipments?.map(_ => false) ?? []
      })
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.commodity$.value) {
      this.commodity$.next(this.initialCommodity ?? createCommodity());
    }
  }

  get commodity(): Commodity|null {
    return this.commodity$.value;
  }

  get cargoCrossVolumeRequired(): boolean {
    const commodity = this.commodity;
    if (!commodity) {
      return false;
    }
    return !! commodity.cargoGrossVolume || !! commodity.cargoGrossVolumeUnit;
  }

  removeRequestedEquipment(i: number, requestedEquipmentGroupControl: AbstractFormGroupDirective): void {
    const commodity = this.commodity;
    commodity!.requestedEquipments!.splice(i, 1);
    this.requestedEquipmentSelected.splice(i, 1);
    clearValidationIssuesOnFormGroupDirective(requestedEquipmentGroupControl);
  }

  addRequestedEquipment() {
    const commodity = this.commodity;
    if (! commodity!.requestedEquipments) {
      commodity!.requestedEquipments = []
    }
    commodity!.requestedEquipments ??= [];
    commodity!.requestedEquipments!.push(createRequestedEquipment());
    this.requestedEquipmentSelected.push(true);
  }
}
