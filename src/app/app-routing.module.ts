import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './brand-add/brand-add.component';

import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentSummaryComponent } from './components/rent-summary/rent-summary.component';
// import { RentSummaryComponent } from './components/rent-summary/rent-summary.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  // {path:"rental", component:RentalComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/detail/:carId",component:CarDetailComponent},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"colors/add",component:ColorAddComponent},
  {path:"cars/rental/:carId",component:RentalComponent},
  {path:"cars/rental",component:RentalComponent},
  {path:"cars/rentals",component:RentSummaryComponent},
  {path:"rental/:id", component:RentalComponent},
  {path:"payment/:rental",component:PaymentComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"colors/update/:color",component:ColorAddComponent},
  {path:"colors/getall",component:ColorComponent},
  {path:"cars/update/:car",component:CarAddComponent},
  {path:"cars/add", component:CarAddComponent},
  { path:"brands/update/:brand",component:BrandAddComponent},
  { path:"brands/add",component:BrandAddComponent},
  { path:"brands/getall",component:BrandComponent},
  {path:"cars/:filterText", component:CarComponent },
  {path:"cars/filter/brand/:brandId",component:CarComponent},
  {path:"cars/filter/color/:colorId",component:CarComponent},
  {path:"cars/filter/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"profile", component:ProfileComponent },
  {path:"customers",component:CustomerComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
