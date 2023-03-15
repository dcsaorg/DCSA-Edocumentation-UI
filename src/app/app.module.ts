import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BookingComponent} from './components/booking/booking.component';
import {BookingListComponent} from './components/booking-list/booking-list.component';
import {ConfigService} from './services/config.service';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {HttpClientModule} from '@angular/common/http';
import {Globals} from './models/globals';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DisplayLocationComponent} from './components/display-location/display-location.component';
import {DatePipe} from '@angular/common';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BookingEditorComponent} from './components/booking/booking-editor/booking-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {DebounceClickDirective} from './directives/debounce-click.directive';
import {ButtonModule} from 'primeng/button';
import {EnumDropdownDirective} from './directives/enum-dropdown.directive';
import {CheckboxModule} from 'primeng/checkbox';
import {NullDefaultValueDirective} from './directives/null-default-value.directive';
import {VesselIMONumberDirective} from './validators/vessel-imo-number.directive';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { EditLocationComponent } from './components/display-location/edit-location/edit-location.component';
import {InputTextModule} from 'primeng/inputtext';
import { ValidityMarkerComponent } from './components/validity-marker/validity-marker.component';
import {CalendarModule} from 'primeng/calendar';
import { EditCommodityComponent } from './components/commodity/edit-commodity/edit-commodity.component';
import { EditReeferComponent } from './components/reefer/edit-reefer/edit-reefer.component';
import {TagModule} from 'primeng/tag';
import {InputNumberModule} from 'primeng/inputnumber';
import { EditRequestedEquipmentComponent } from './components/requested-equipment/edit-requested-equipment/edit-requested-equipment.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import {
  EditDocumentPartyComponent
} from './components/document-party/edit-document-party/edit-document-party.component';
import { EditAddressComponent } from './components/display-location/edit-address/edit-address.component';
import {NonEmptyLocationDirective} from './validators/non-empty-location.directive';
import { UiVsApiComponentComponent } from './components/ui-vs-api-component/ui-vs-api-component.component';
import {DividerModule} from 'primeng/divider';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';

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
    DebounceClickDirective,
    EnumDropdownDirective,
    NullDefaultValueDirective,
    VesselIMONumberDirective,
    EditLocationComponent,
    ValidityMarkerComponent,
    EditCommodityComponent,
    EditReeferComponent,
    EditRequestedEquipmentComponent,
    EditDocumentPartyComponent,
    EditAddressComponent,
    NonEmptyLocationDirective,
    UiVsApiComponentComponent,
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
        DropdownModule,
        ButtonModule,
        ReactiveFormsModule,
        CheckboxModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        ConfirmDialogModule,
        InputTextModule,
        CalendarModule,
        TagModule,
        InputNumberModule,
        InputSwitchModule,
        DividerModule,
        TriStateCheckboxModule,
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
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
