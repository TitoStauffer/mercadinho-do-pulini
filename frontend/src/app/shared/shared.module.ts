import { NgModule } from '@angular/core';
import { PRIMENG_IMPORTS } from './primeng-imports';
import {ServicesModule} from "./services/services.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [
        PRIMENG_IMPORTS,
        ServicesModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    exports: [
        PRIMENG_IMPORTS,
        ServicesModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class SharedModule { }
