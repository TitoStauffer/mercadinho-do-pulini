import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarCodeRoutingModule } from './bar-code-routing.module';
import {BarCodeComponent} from "./bar-code/bar-code.component";
import {SharedModule} from "../../shared/shared.module";
import { BarcodeGeneratorAllModule,QRCodeGeneratorAllModule,DataMatrixGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import {NgxPrintModule} from "ngx-print";


@NgModule({
  declarations: [
    BarCodeComponent,
  ],
    imports: [
        BarcodeGeneratorAllModule,
        SharedModule,
        CommonModule,
        BarCodeRoutingModule,
        NgxPrintModule,
    ],
  exports: [
    BarCodeComponent
  ]
})
export class BarCodeModule { }
