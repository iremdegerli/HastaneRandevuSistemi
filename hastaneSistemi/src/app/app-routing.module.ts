import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppointmentBookingComponent } from './components/appointment-booking/appointment-booking.component';
import { AppointmentStatusComponent } from './components/appointment-status/appointment-status.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path:'randevu-al', component:AppointmentBookingComponent
  },
  {
    path:'randevu-bul',component:AppointmentStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
