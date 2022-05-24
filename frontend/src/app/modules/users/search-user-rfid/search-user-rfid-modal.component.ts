import {Component, OnInit, ViewChild} from "@angular/core";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {SearchUserRfidComponent} from "./search-user-rfid.component";

@Component({
    selector: 'app-search-user-rfid-modal',
    template: '<app-search-user-rfid (fechar)="fechar($event)"></app-search-user-rfid>',
})
export class SearchUserRfidModalComponent implements OnInit{

    constructor(public ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {}

    @ViewChild(SearchUserRfidComponent, {static: true}) form: SearchUserRfidComponent;

    ngOnInit(): void {
        if(this.config.data) {
        }
    }

    fechar(entidade?) {
        this.ref.close(entidade);
        this.ref.destroy();
    }

}
