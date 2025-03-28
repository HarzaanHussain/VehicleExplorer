import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManufacturersComponent } from './manufacturers/manufacturers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ManufacturerDetailComponent } from './manufacturers/manufacturer-detail/manufacturer-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'manufacturers', component: ManufacturersComponent },
  { path: 'manufacturers/create', component: ManufacturerDetailComponent },
  { path: 'manufacturers/:id', component: ManufacturerDetailComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
