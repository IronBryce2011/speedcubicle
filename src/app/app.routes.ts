import { Routes } from '@angular/router';
import { ProductComponent } from './product/product';
import { Home } from './home/home';
import { Success } from './success/success';
export const routes: Routes = [
  {path: '', component: Home},  
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', loadComponent: () => import('./cart/cart').then(m => m.Cart) },
  { path: 'success', component: Success }
];
