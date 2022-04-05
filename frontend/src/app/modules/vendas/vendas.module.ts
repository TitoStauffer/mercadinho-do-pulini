import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendasRoutingModule } from './vendas-routing.module';
import { VendaFormComponent } from './venda-form/venda-form.component';
import {SharedModule} from "../../shared/shared.module";
import { ListarItensVendaComponent } from './listar-itens-venda/listar-itens-venda.component';
import {ProductsModule} from "../products/products.module";
import {UsersModule} from "../users/users.module";
import { VendaCafeteriaFormComponent } from './venda-cafeteria-form/venda-cafeteria-form.component';


@NgModule({
  declarations: [VendaFormComponent, ListarItensVendaComponent, VendaCafeteriaFormComponent],
  imports: [
    CommonModule,
    VendasRoutingModule,
    SharedModule,
    ProductsModule,
    UsersModule
  ]
})
export class VendasModule { }
