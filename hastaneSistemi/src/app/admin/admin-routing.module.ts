import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from '../components/home/home.component';
import { PoliklinikAdminComponent } from './components/poliklinik-admin/poliklinik-admin.component';
import { DoktorAdminComponent } from './components/doktor-admin/doktor-admin.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent
  },
  {
    path:'poliklinik',component:PoliklinikAdminComponent
  },
  {
    path:'doktor',component:DoktorAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  
 }
