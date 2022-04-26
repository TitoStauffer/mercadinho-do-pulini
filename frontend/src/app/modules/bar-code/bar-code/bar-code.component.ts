import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BarCodeService} from "../../../services/bar-code.service";
import {BlockUIService} from "ng-block-ui";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-bar-code',
  templateUrl: './bar-code.component.html',
  styleUrls: ['./bar-code.component.css']
})
export class BarCodeComponent implements OnInit {
    codeBarToPrint;
    form: FormGroup;
    submit = false;

  constructor(
    private blockUI: BlockUIService,
    private fb: FormBuilder,
    private barCodeService: BarCodeService) { }

  ngOnInit(): void {
      this.iniciarForm()
  }

    iniciarForm() {
        this.form = this.fb.group({
            barcode: [null, [Validators.required]],
        },{updateOn:"change"})
    }

    print(){
      if(this.form.valid && this.form.get("barcode").valid) {
          this.blockUI.start("Carregando");
          this.barCodeService.print(this.form.get("barcode").value)
              .pipe(
                finalize( () => {
                    this.printBar();
                    this.blockUI.stop("Carregado");
                })
              )
              .subscribe(res => this.codeBarToPrint = res)
      }
    }

    printBar(){
        const WindowPrt =  window.open('', '', 'left=0,top=0,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(this.codeBarToPrint);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
    }

    // generateBarcode(){
    //     var barcodeValue = document.getElementById("barcodeValue");
    //     var barcodeType = document.getElementById("barcodeType");
    //     var showText = document.getElementById("showText");
    //     JsBarcode("#barcode", barcodeValue, {
    //         format: barcodeType,
    //         displayValue: showText,
    //         lineColor: "#24292e",
    //         width:2,
    //         height:40,
    //         fontSize: 20
    //     });
    // }
}
