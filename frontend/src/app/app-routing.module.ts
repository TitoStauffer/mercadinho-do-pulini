import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiarioErrosComponent } from './components/diario-erros/diario-erros.component';
import { LoginSuccessComponent } from '@nuvem/angular-base';
import {VendasModule} from "./modules/vendas/vendas.module";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProductsModule} from './modules/products/products.module';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'diario-erros', component: DiarioErrosComponent, data: { breadcrumb: 'Diário de Erros'} },
    { path: 'login-success', component: LoginSuccessComponent },
    { path: 'vendas', loadChildren: () => VendasModule },
    { path: 'produtos', loadChildren: () => ProductsModule }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
