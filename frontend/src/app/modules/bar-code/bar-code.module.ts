import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarCodeRoutingModule } from './bar-code-routing.module';
import {BarCodeComponent} from "./bar-code/bar-code.component";
import {SharedModule} from "../../shared/shared.module";
import { BarcodeGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import {NgxPrintModule} from "ngx-print";
import {TextBoxModule} from "@syncfusion/ej2-angular-inputs";
import {InputNumberModule} from 'primeng/inputnumber';



@NgModule({
  declarations: [
    BarCodeComponent
  ],
    imports: [
        InputNumberModule,
        BarcodeGeneratorAllModule,
        SharedModule,
        CommonModule,
        BarCodeRoutingModule,
        NgxPrintModule,
        TextBoxModule,
    ],
  exports: [
    BarCodeComponent
  ]
})
export class BarCodeModule { }
