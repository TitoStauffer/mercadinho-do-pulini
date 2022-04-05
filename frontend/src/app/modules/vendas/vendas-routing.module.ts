import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VendaFormComponent} from "./venda-form/venda-form.component";
import {VendaCafeteriaFormComponent} from "./venda-cafeteria-form/venda-cafeteria-form.component";


const routes: Routes = [
    {
        path: '',
        component: VendaFormComponent
    },
    {
        path: 'cafeteria',
        component: VendaCafeteriaFormComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
