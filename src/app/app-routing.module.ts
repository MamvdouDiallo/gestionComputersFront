import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeComponent } from './commande/commande.component';
import { LoginComponent } from './login/login.component';
import { ListeComponent } from './liste/liste.component';
import { AddProductComponent } from './liste/add-product/add-product.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'commande', component: CommandeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'accueil', component: ListeComponent, canActivate: [AuthGuard] },
  { path: 'accueil/add', component: AddProductComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
