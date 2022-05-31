import { Component, OnInit } from '@angular/core';
import {ProdutoVendaModel} from "../../../models/produto-venda.model";
import {DialogService, MessageService} from "primeng";
import {VendaModel} from "../../../models/venda.model";
import {SaleService} from "../../../shared/services/sale.service";
import {ProductService} from "../../../shared/services/product.service";
import {SearchUserRfidModalComponent} from "../../users/search-user-rfid/search-user-rfid-modal.component";

@Component({
  selector: 'app-venda-cafeteria-form',
  templateUrl: './venda-cafeteria-form.component.html',
  styleUrls: ['./venda-cafeteria-form.component.css']
})
export class VendaCafeteriaFormComponent implements OnInit {

    itens: ProdutoVendaModel[] = [];
    itensSelecionados: ProdutoVendaModel[] = [];

    constructor(
        private messageService: MessageService,
        private dialogService: DialogService,
        private saleService: SaleService,
        private productService: ProductService
    ) { }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts() {
        this.productService.findAllByCoffee()
            .subscribe(res => {
                if(res){
                    this.itens = res;
                    this.messageService.add({severity: "success", summary: "Sucesso", detail: 'Produtos listados'});
                }
                },(error) => this.messageService.add({severity: "error", summary: "Erro", detail: error.error.message}));
    }

    getImage(item) {
        if(!item.image) {
            return 'assets/images/image_default.jpg';
        }
        return item.image;
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
        if(item.amount > 0 ){
            const index = this.itensSelecionados.findIndex(produto => produto.id === item.id);

            if(index !== -1) {
                this.itensSelecionados[index].amount--;
                this.setTotalPrice(item);
            }
        }else{
            this.messageService.add({severity: "warn", summary: "Atenção", detail: 'Quantidade já está em 0'});
        }
    }

    finishSale() {
        const modal = this.dialogService.open(SearchUserRfidModalComponent, {});

        modal.onClose.subscribe(res => {
            if(res) {
                const sale = new VendaModel();
                sale.products = this.itens;
                sale.userId = res.id;

                this.saleService.save(sale).subscribe(
                    () => this.messageService.add({severity: "success", summary: "Sucesso", detail: 'Venda Cadastrada com Pendente favor acertar no caixa'})
            , (error) => this.messageService.add({severity: "error", summary: "Erro", detail: error.error.message}));
            }
        })
    }

}
