import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductFormComponent} from './product-form/product-form.component';
import {ProductEntryComponent} from './product-entry/product-entry.component';


const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'novo',
        component: ProductFormComponent
    },
    {
        path: 'entrada',
        component: ProductEntryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {
}
