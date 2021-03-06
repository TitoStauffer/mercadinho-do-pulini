import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {BreadcrumbModule, ErrorStackModule, MenuModule, PageNotificationModule} from '@nuvem/primeng-components';
import {ErrorModule, SecurityModule, VersionTagModule} from '@nuvem/angular-base';
import {DiarioErrosComponent} from './components/diario-erros/diario-erros.component';
import {BlockUIModule} from 'ng-block-ui';
import {LoginComponent} from "./login/login.component";
import {
    BarcodeGeneratorAllModule,
    DataMatrixGeneratorAllModule,
    QRCodeGeneratorAllModule
} from "@syncfusion/ej2-angular-barcode-generator";

@NgModule({
    declarations: [
        AppComponent,
        DiarioErrosComponent,
        LoginComponent
    ],
    imports: [
        BarcodeGeneratorAllModule,
        QRCodeGeneratorAllModule ,
        DataMatrixGeneratorAllModule,
        BlockUIModule.forRoot({
            message: "Carregando..."
        }),
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        PageNotificationModule,
        BreadcrumbModule,
        ErrorStackModule,
        ErrorModule,
        VersionTagModule,
        SecurityModule.forRoot(environment.auth),
        MenuModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
