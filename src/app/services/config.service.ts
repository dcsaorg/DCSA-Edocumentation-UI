import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {Config} from '../models/config';
import {Globals} from '../models/globals';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {CONFIG_FILE} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private readonly CONFIG_FILE: string;
  private httpClient: HttpClient;

  constructor(private handler: HttpBackend,
              private globals: Globals,
              ) {
    this.CONFIG_FILE = CONFIG_FILE;
    // manually instantiate this to avoid a circular dependencies between ConfigService
    // and AuthService/AuthInterceptor.
    this.httpClient = new HttpClient(handler);
  }

  getConfig = (): Observable<Config> => this.httpClient.get<Config>(this.CONFIG_FILE).pipe(
    tap(config => this.globals.config = config)
  );

  load(): Promise<void> {
    return new Promise((resolve) => {
      this.getConfig().subscribe((config) => {
           resolve();
       });
    });
  }
}
