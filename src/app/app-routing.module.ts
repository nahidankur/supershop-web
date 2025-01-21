import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/other/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { OtherComponent } from './pages/other/other.component';
import { ProductDetailsComponent } from './pages/other/product-details/product-details.component';
import { RegistrationComponent } from './pages/other/registration/registration.component';
import { ProductListComponent } from './pages/other/product-list/product-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'cart',
    component: OtherComponent,
    children: [
      { path: '', component: CartComponent }
    ]
  },
  {
    path: 'product-list',
    component: OtherComponent,
    children: [
      { path: '', component: ProductListComponent }
    ]
  },
  {
    path: 'product/:oid',
    component: OtherComponent,
    children: [
      { path: '', component: ProductDetailsComponent }
    ]
  },
  {
    path: 'registration',
    component: OtherComponent,
    children: [
      { path: '', component: RegistrationComponent }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
