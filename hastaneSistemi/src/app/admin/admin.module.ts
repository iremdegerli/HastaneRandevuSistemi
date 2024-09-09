import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { PoliklinikAdminComponent } from './components/poliklinik-admin/poliklinik-admin.component';
import { DoktorAdminComponent } from './components/doktor-admin/doktor-admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderAdminComponent,
    PoliklinikAdminComponent,
    DoktorAdminComponent,
    HomeAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule
  ]
})
export class AdminModule { }
