import {Component, Input} from '@angular/core';
import {AbstractControl, AbstractControlDirective} from '@angular/forms';

@Component({
  selector: 'app-validity-marker',
  templateUrl: './validity-marker.component.html',
  styleUrls: ['./validity-marker.component.scss']
})
export class ValidityMarkerComponent {

  @Input() controlStatus: AbstractControlDirective|AbstractControl|null = null;

}
