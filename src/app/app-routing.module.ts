import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookingListComponent} from './components/booking-list/booking-list.component';
import {BookingComponent} from './components/booking/booking.component';


const guards: any[] = [];

const routes: Routes = [
  {path: '', redirectTo: '/latest-bookings', pathMatch: 'full'},
  {path: 'latest-bookings', component: BookingListComponent, canActivate: guards},
  {path: 'bookings/:cbrr', component: BookingComponent, canActivate: guards},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
