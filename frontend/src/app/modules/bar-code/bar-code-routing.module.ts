import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BarCodeComponent} from "./bar-code/bar-code.component";


const routes: Routes = [
    {
        path: '',
        component: BarCodeComponent
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarCodeRoutingModule { }
