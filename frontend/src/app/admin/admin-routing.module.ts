import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {DiarioErrosComponent} from "../components/diario-erros/diario-erros.component";
import {LoginSuccessComponent} from "@nuvem/angular-base";
import {UserListComponent} from "./user-list/user-list.component";
import {UserComponent} from "./user/user.component";
import {ProductsModule} from "../modules/products/products.module";
import {VendasModule} from "../modules/vendas/vendas.module";
import {PermissionGuard} from "../guard/permission.guard";
import {PermissionListComponent} from "./permission-list/permission-list.component";
import {BarCodeModule} from "../modules/bar-code/bar-code.module";


const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
          { path: 'diario-erros', component: DiarioErrosComponent, data: { breadcrumb: 'Diário de Erros'} , canActivate: [PermissionGuard]},
          { path: 'login-success', component: LoginSuccessComponent },
          { path: 'user',  component: UserListComponent, canActivate: [PermissionGuard] },
          { path: 'permissao',  component: PermissionListComponent, canActivate: [PermissionGuard] },
          { path: 'vendas',  loadChildren: () => VendasModule, canActivate: [PermissionGuard] },
          { path: 'produtos',  loadChildren: () => ProductsModule, canActivate: [PermissionGuard] },
          { path: 'barcodes',  loadChildren: () => BarCodeModule, canActivate: [PermissionGuard] },
          { path: 'user/save',  component: UserComponent, canActivate: [PermissionGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
