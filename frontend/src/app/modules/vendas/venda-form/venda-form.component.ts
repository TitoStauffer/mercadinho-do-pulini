import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService} from "primeng";
import {ReadProductModalComponent} from "../../products/read-product/read-product-modal.component";
import {ProdutoVendaModel} from "../../../models/produto-venda.model";
import {SearchUserModalComponent} from "../../users/search-user/search-user-modal.component";
import {UserModel} from "../../../models/user.model";
import {DetailsProductComponent} from "../../products/details-product/details-product.component";
import {VendaModel} from "../../../models/venda.model";
import {SaleService} from "../../../shared/services/sale.service";
import {PageNotificationService} from "@nuvem/primeng-components";
import {ThermalPrinterService} from "../../../shared/services/thermal-printer.service";
import {DialogConfig} from "../../../shared/Utils/dialog-config";

@Component({
    selector: 'app-venda-form',
    templateUrl: './venda-form.component.html',
    styleUrls: ['./venda-form.component.css']
})
export class VendaFormComponent implements OnInit {

    principalUser: UserModel;
    nameOtherClients: string[] = [];
    itens: ProdutoVendaModel[] = [];
    totalPrice: number;
    lastProduct: ProdutoVendaModel = new ProdutoVendaModel();

    @ViewChild(DetailsProductComponent) detaislProduct: DetailsProductComponent;

    constructor(
        private modalService: DialogService,
        private saleService: SaleService,
        private pageNotification: PageNotificationService,
        private printService: ThermalPrinterService
    ) {
    }

    ngOnInit(): void {
    }

    readCard() {
        const modal = this.modalService.open(
            SearchUserModalComponent,
            new DialogConfig(null, 'Buscar cliente')
        );

        modal.onClose.subscribe(res => {
                if (res) {
                    if (!this.principalUser) {
                        this.principalUser = res.user;
                        this.itens = res.products;
                        return;
                    } else {
                        if (!this.userAlreadyAdded(res.user)) {
                            res.products.forEach(item => this.itens.push(item));
                            this.nameOtherClients.push(res.user.name);
                        }
                    }
                }
            }
        )
    }

    userAlreadyAdded(user: UserModel): boolean {
        if (this.nameOtherClients.includes(user.name)) return true;
        return this.principalUser.name == user.name;
    }

    addProduct() {
        const modal = this.modalService.open(
            ReadProductModalComponent,
            new DialogConfig(null, 'Buscar produto')
        );

        modal.onClose.subscribe(res => {
            if (res) {
                this.itens.push(res);
                this.lastProduct = res;
                this.detaislProduct.onLoadEntity(res);
                this.totalPrice = this.sumTotal();
            }
        })
    }

    sumTotal() {
        return this.itens
            .map(item => item.totalPrice)
            .reduce((total, price) => total + price, 0);
    }

    finishSale() {
        const sale = new VendaModel();
        sale.products = this.itens;
        sale.userId = this.principalUser.id;

        this.saleService.save(sale).subscribe(() => {
            this.resetPage();
            this.pageNotification.addSuccessMessage('Venda finalizada com sucesso');
        });
    }

    resetPage() {
        this.itens = [];
        this.principalUser = null;
        this.nameOtherClients = [];
        this.totalPrice = 0.0;
        this.lastProduct = new ProdutoVendaModel();
        this.detaislProduct.onLoadEntity(this.lastProduct);
    }

}
