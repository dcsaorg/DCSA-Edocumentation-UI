import {Component, Input} from '@angular/core';
import {EDocLocation} from '../../models/location';

@Component({
  selector: 'app-display-location',
  templateUrl: './display-location.component.html',
  styleUrls: ['./display-location.component.scss']
})
export class DisplayLocationComponent {

  @Input() location: EDocLocation | null = null;
}
