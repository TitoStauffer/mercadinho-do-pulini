import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SearchUserComponent } from './search-user/search-user.component';
import {SearchUserModalComponent} from "./search-user/search-user-modal.component";
import {SharedModule} from "../../shared/shared.module";
import {SearchUserRfidComponent} from "./search-user-rfid/search-user-rfid.component";
import {SearchUserRfidModalComponent} from "./search-user-rfid/search-user-rfid-modal.component";


@NgModule({
    declarations: [
        SearchUserComponent,
        SearchUserRfidComponent,
        SearchUserModalComponent,
        SearchUserRfidModalComponent
    ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule
    ],
    entryComponents: [
        SearchUserModalComponent
    ],
    exports: [
        SearchUserModalComponent,
        SearchUserComponent
    ]
})
export class UsersModule { }
