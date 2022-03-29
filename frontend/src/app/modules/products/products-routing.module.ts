import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailsProductComponent} from "./details-product/details-product.component";


const routes: Routes = [{
    path: '',
    component: DetailsProductComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
