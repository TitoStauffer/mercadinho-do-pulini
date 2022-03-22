import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiarioErrosComponent } from './components/diario-erros/diario-erros.component';
import { LoginSuccessComponent } from '@nuvem/angular-base';
import {AuthGuard} from "./guard/auth.guard";
import {LoginComponent} from "./login/login.component";
import {GuestGuard} from "./guard/guest.guard";

const routes: Routes = [
    {path: '', redirectTo: 'admin', pathMatch: 'full'},
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]},
    { path: 'diario-erros', component: DiarioErrosComponent, data: { breadcrumb: 'Diário de Erros'} },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'login-success', component: LoginSuccessComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
