import { Component, OnInit } from '@angular/core';
import {ProdutoVendaModel} from "../../../models/produto-venda.model";
import {ProductModel} from "../../../models/product.model";
import {DialogService} from "primeng";
import {SearchUserModalComponent} from "../../users/search-user/search-user-modal.component";
import {VendaModel} from "../../../models/venda.model";
import {SaleService} from "../../../shared/services/sale.service";

@Component({
  selector: 'app-venda-cafeteria-form',
  templateUrl: './venda-cafeteria-form.component.html',
  styleUrls: ['./venda-cafeteria-form.component.css']
})
export class VendaCafeteriaFormComponent implements OnInit {

    itens: ProdutoVendaModel[] = [
        {id: 1, description: 'Café Expresso', price: 6.5, barCode: ''},
        {id: 2, description: 'Pão de Queijo', price: 5.0, barCode: ''},
        {id: 3, description: 'Misto Quente', price: 8, barCode: ''},
        {id: 4, description: 'Café comum', price: 2.3, barCode: ''},
    ];
    itensSelecionados: ProdutoVendaModel[] = [];

    constructor(
        private dialogService: DialogService,
        private saleService: SaleService
    ) { }

    ngOnInit(): void {
    }

    getImage(item) {
        if(!item.image) {
            return 'assets/images/image_default.jpg';
        }
        return 'data:image/png;base64,' + item.image;
    }

    getTotalValue() {
        return this.itensSelecionados.map(item => item.price * item.amount).reduce((total, valor) => total + valor, 0);
    }

    addAmount(item) {
        const index = this.itensSelecionados.findIndex(produto => produto.id === item.id);

        if(index !== -1) {
            this.itensSelecionados[index].amount++;
            this.setTotalPrice(item);
            return;
        }
        item.amount = 1;
        this.setTotalPrice(item);
        this.itensSelecionados.push(item);
    }

    setTotalPrice(item) {
        item.totalPrice = item.price * item.amount;
    }

    removeAmount(item) {
        const index = this.itensSelecionados.findIndex(produto => produto.id === item.id);

        if(index !== -1) {
            this.itensSelecionados[index].amount--;
            this.setTotalPrice(item);
        }
    }

    finishSale() {
        const modal = this.dialogService.open(SearchUserModalComponent, {});

        modal.onClose.subscribe(res => {
            if(res) {
                const sale = new VendaModel();
                sale.products = this.itens;
                sale.userId = res.id;

                this.saleService.save(sale).subscribe(res => {});
            }
        })
    }

}
