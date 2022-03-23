import {Component, OnInit, ViewChild} from "@angular/core";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {ReadProductComponent} from "./read-product.component";

@Component({
    selector: 'app-read-product-modal',
    template: '<app-read-product (fechar)="fechar($event)"></app-read-product>',
})
export class ReadProductModalComponent implements OnInit{

    constructor(public ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {}

    @ViewChild(ReadProductComponent, {static: true}) form: ReadProductComponent;

    ngOnInit(): void {
        if(this.config.data) {
        }
    }

    fechar(entidade?) {
        this.ref.close(entidade);
        this.ref.destroy();
    }

}
