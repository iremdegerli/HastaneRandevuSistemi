import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {AppointmentBookingComponent} from './components/appointment-booking/appointment-booking.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppointmentStatusComponent } from './components/appointment-status/appointment-status.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorPanelComponent } from './components/doctor-panel/doctor-panel.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { PanelHeaderComponent } from './components/panel-header/panel-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AppointmentBookingComponent,
    AppointmentStatusComponent,
    RegisterComponent,
    LoginComponent,
    DoctorPanelComponent,
    AdminPanelComponent,
    PanelHeaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    HttpClientModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
