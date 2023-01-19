import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import {ConfigService} from './services/config.service';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {HttpClientModule} from '@angular/common/http';
import {Globals} from './models/globals';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { DisplayLocationComponent } from './components/display-location/display-location.component';
import {DatePipe} from '@angular/common';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BookingEditorComponent } from './components/booking/booking-editor/booking-editor.component';
import {FormsModule} from '@angular/forms';

export function ConfigLoader(configService: ConfigService) {
  return () => configService.load();
}


@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    BookingListComponent,
    DisplayLocationComponent,
    BookingEditorComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TableModule,
        TooltipModule,
        HttpClientModule,
        ProgressSpinnerModule,
        CardModule,
        AccordionModule,
        BrowserAnimationsModule,
        FormsModule,
    ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [ConfigService],
      multi: true
    },
    Globals,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
