import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookingListComponent} from './components/booking-list/booking-list.component';
import {BookingComponent} from './components/booking/booking.component';
import {BookingEditorComponent} from './components/booking/booking-editor/booking-editor.component';
import {DocumentPartyDemoComponent} from './components/document-party-demo/document-party-demo.component';


const guards: any[] = [];

const routes: Routes = [
  {path: '', redirectTo: '/latest-bookings', pathMatch: 'full'},
  {path: 'latest-bookings', component: BookingListComponent, canActivate: guards},
  {path: 'bookings/new', component: BookingEditorComponent, canActivate: guards},
  {path: 'bookings/:cbrr/edit', component: BookingEditorComponent, canActivate: guards},
  {path: 'bookings/:cbrr', component: BookingComponent, canActivate: guards},
  {path: 'demo/document-parties', component: DocumentPartyDemoComponent, canActivate: guards},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
