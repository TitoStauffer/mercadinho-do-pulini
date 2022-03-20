import {Component, OnInit, ViewChild} from "@angular/core";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng";
import {SearchUserComponent} from "./search-user.component";

@Component({
    selector: 'app-search-user-modal',
    template: '<app-search-user (fechar)="fechar($event)"></app-search-user>',
})
export class SearchUserModalComponent implements OnInit{

    constructor(public ref: DynamicDialogRef,
                public config: DynamicDialogConfig) {}

    @ViewChild(SearchUserComponent, {static: true}) form: SearchUserComponent;

    ngOnInit(): void {
        if(this.config.data) {
        }
    }

    fechar(entidade?) {
        this.ref.close(entidade);
        this.ref.destroy();
    }

}
