import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {Observable} from 'rxjs';
import {ActiveReeferSettings, TemperatureUnit} from '../../../../../projects/bkg-swagger-client';
import {createActiveReeferSettings} from '../../../util/object-factory';
import {SelectItem} from 'primeng/api/selectitem';
import {StaticDataService} from '../../../services/static-data.service';
import {ControlContainer, NgModelGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-reefer',
  templateUrl: './edit-reefer.component.html',
  styleUrls: ['./edit-reefer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgModelGroup,
    },
  ]
})
export class EditReeferComponent implements OnChanges {

  hasReefer: boolean|null = null;

  lastActiveReeferSettings?: ActiveReeferSettings;
  temperatureUnits$: Observable<SelectItem<TemperatureUnit|null>[]>|null = null;

  @Input()
  activeReeferSettings?: ActiveReeferSettings;

  @Output()
  activeReeferSettingsChange = new EventEmitter<ActiveReeferSettings|undefined>();

  constructor(private staticDataService: StaticDataService,
              private modelGroup: ControlContainer,
              ) {
    this.temperatureUnits$ = staticDataService.getTemperatureUnitSelectItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hasReefer = !!this.activeReeferSettings;
  }

  get totalAtmosphere(): number {
    const reefer = this.activeReeferSettings;
    return (reefer?.o2Setpoint ?? 0) + (reefer?.co2Setpoint ?? 0);
  }

  onHasReeferSlideToggleChange(): void {
    this.hasReefer = !this.hasReefer;
    if (!this.hasReefer) {
      this.lastActiveReeferSettings = this.activeReeferSettings;
      this.activeReeferSettings = undefined;
    } else {
      this.activeReeferSettings = this.lastActiveReeferSettings ?? createActiveReeferSettings();
    }
    this.modelGroup.control?.markAsDirty();
    this.activeReeferSettingsChange.emit(this.activeReeferSettings);
  }
}
