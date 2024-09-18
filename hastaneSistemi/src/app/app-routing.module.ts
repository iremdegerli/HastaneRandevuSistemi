import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppointmentBookingComponent } from './components/appointment-booking/appointment-booking.component';
import { AppointmentStatusComponent } from './components/appointment-status/appointment-status.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DoctorPanelComponent } from './components/doctor-panel/doctor-panel.component';
import { AuthGuard } from './guards/auth.guard';
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
  { 
    path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] ,data: {role: 'admin'}
  },
  { 
    path: 'doctor', component: DoctorPanelComponent, canActivate:[AuthGuard],data: {role: 'doctor'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
