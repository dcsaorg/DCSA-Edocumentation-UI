import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { BookingEventsService } from './api/bookingEvents.service';
import { BookingRequestService } from './api/bookingRequest.service';
import { CancellationService } from './api/cancellation.service';
import { ShipmentService } from './api/shipment.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    BookingEventsService,
    BookingRequestService,
    CancellationService,
    ShipmentService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
