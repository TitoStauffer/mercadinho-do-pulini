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
    nameOtherClients: any[] = [];
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
                        this.totalPrice = this.sumTotal()
                        return;
                    }
                    if (!this.userAlreadyAdded(res.user)) {
                        res.products.forEach(item => this.itens.push(item));
                        this.nameOtherClients.push({id: res.user.id, name: res.user.name});
                        this.totalPrice = this.sumTotal()
                    }
                }
            }
        )
    }

    userAlreadyAdded(user: UserModel): boolean {
        return this.nameOtherClients.map(user => user.id).includes(user.id) || this.principalUser.name == user.name;
    }

    addProduct(product){
        if(product) {
            this.itens.push(product);
            this.lastProduct = product;
            this.detaislProduct.onLoadEntity(product);
            this.totalPrice = this.sumTotal();
        }
    }

    removeProduct(product: ProdutoVendaModel) {
      if(product.saleId) {
          this.saleService.cancelSale({saleId: product.saleId, productId: product.id})
              .subscribe(res => this.pageNotification.addSuccessMessage("Produto removido com sucesso"));
      }

      const index = this.itens.findIndex(prod => prod.id === product.id);

      if(index !== -1) {
          this.itens.splice(index, 1);
          this.totalPrice = this.sumTotal();
          this.pageNotification.addSuccessMessage("Produto removido com sucesso");
      }
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
      sale.otherUserIds = this.nameOtherClients.map(clients => clients.id);

        this.saleService.save(sale).subscribe(() => {
            this.resetPage();
            this.pageNotification.addSuccessMessage('Venda finalizada com sucesso');
            this.printService.printSale(sale.products);
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
