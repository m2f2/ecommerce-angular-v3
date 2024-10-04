import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/products/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ObservableComponent } from './components/observable/observable.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './Guards/Guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'observable', component: ObservableComponent },
  { path: 'admin/addProduct', component: NewProductComponent, canActivate: [AuthGuard] },
  { path: 'admin/addProduct/:id', component: NewProductComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];
