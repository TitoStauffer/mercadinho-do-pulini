import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarCodeRoutingModule } from './bar-code-routing.module';
import {BarCodeComponent} from "./bar-code/bar-code.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    BarCodeComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    BarCodeRoutingModule,
  ],
  exports: [
    BarCodeComponent
  ]
})
export class BarCodeModule { }
