import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiarioErrosComponent} from './components/diario-erros/diario-erros.component';
import {LoginSuccessComponent} from '@nuvem/angular-base';
import {AuthGuard} from "./guard/auth.guard";
import {LoginComponent} from "./login/login.component";
import {GuestGuard} from "./guard/guest.guard";
import {VendasModule} from "./modules/vendas/vendas.module";
import {AdminModule} from "./admin/admin.module";
import {ProductsModule} from "./modules/products/products.module";
import {BarCodeModule} from "./modules/bar-code/bar-code.module";

const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full'},
    { path: 'admin', loadChildren: () => AdminModule, canActivate: [AuthGuard]},
    { path: 'diario-erros', component: DiarioErrosComponent, data: { breadcrumb: 'Diário de Erros'} },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'login-success', component: LoginSuccessComponent },
    { path: 'vendas', loadChildren: () => VendasModule },
    { path: 'produtos', loadChildren: () => ProductsModule },
    { path: 'barcodes', loadChildren: () => BarCodeModule }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
