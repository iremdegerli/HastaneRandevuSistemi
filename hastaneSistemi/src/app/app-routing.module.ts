import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppointmentBookingComponent } from './components/appointment-booking/appointment-booking.component';
import { AppointmentStatusComponent } from './components/appointment-status/appointment-status.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path:'randevu-al', component:AppointmentBookingComponent
  },
  {
    path:'randevu-bul',component:AppointmentStatusComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'login', component:LoginComponent
  },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'doctor', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
