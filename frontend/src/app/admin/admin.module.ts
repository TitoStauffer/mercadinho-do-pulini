import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppTopbarComponent} from '../components/topbar/app.topbar.component';
import {AppFooterComponent} from '../components/footer/app.footer.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {SharedModule} from '../shared/shared.module';
import {BreadcrumbModule, MenuModule, PageNotificationModule} from '@nuvem/primeng-components';
import {VersionTagModule} from '@nuvem/angular-base';
import {BlockUIModule} from "ng-block-ui";
import {UserComponent} from "./user/user.component";
import {ReactiveFormsModule} from "@angular/forms";
import {UserListComponent} from "./user-list/user-list.component";
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {PermissionListComponent} from "./permission-list/permission-list.component";


@NgModule({
  declarations: [
    AdminComponent,
    AppTopbarComponent,
    AppFooterComponent,
    UserComponent,
    UserListComponent,
    DashboardComponent,
    PermissionListComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        BreadcrumbModule,
        MenuModule,
        VersionTagModule,
        BlockUIModule,
        PageNotificationModule,
        ReactiveFormsModule
    ]
})
export class AdminModule { }
