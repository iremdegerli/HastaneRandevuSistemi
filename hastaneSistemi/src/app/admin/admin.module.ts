import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { PoliklinikAdminComponent } from './components/poliklinik-admin/poliklinik-admin.component';
import { DoktorAdminComponent } from './components/doktor-admin/doktor-admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderAdminComponent,
    PoliklinikAdminComponent,
    DoktorAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
