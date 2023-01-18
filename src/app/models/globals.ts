import {Config} from './config';
import {Injectable} from '@angular/core';

@Injectable()
export class Globals {
  config: Config|null = null;
}
