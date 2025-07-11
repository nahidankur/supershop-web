import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './pages/other/product-details/product-details.component';
import { CartComponent } from './pages/other/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeatureProductComponent } from './components/product/feature-product/feature-product.component';
import { LatestProductsComponent } from './components/product/latest-products/latest-products.component';
import { HomeComponent } from './pages/home/home.component';
import { OtherComponent } from './pages/other/other.component';
import { RegistrationComponent } from './pages/other/registration/registration.component';
import { ProductListComponent } from './pages/other/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartComponent,
    FooterComponent,
    FeatureProductComponent,
    LatestProductsComponent,
    HomeComponent,
    OtherComponent,
    RegistrationComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
