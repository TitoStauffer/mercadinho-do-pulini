import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import {DiarioErrosComponent} from "../components/diario-erros/diario-erros.component";
import {LoginSuccessComponent} from "@nuvem/angular-base";
import {UserListComponent} from "./user-list/user-list.component";
import {UserComponent} from "./user/user.component";
import {DashboardComponent} from "../components/dashboard/dashboard.component";


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
          { path: 'diario-erros', component: DiarioErrosComponent, data: { breadcrumb: 'Diário de Erros'} },
          { path: 'login-success', component: LoginSuccessComponent },
          { path: 'user',  component: UserListComponent },
          { path: 'user/save',  component: UserComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
