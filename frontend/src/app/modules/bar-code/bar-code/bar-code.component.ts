import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup} from "@angular/forms";
import {MessageService, SelectItem} from "primeng";
import {ProductService} from "../../../shared/services/product.service";
import {ProductListBarcode} from "../../../models/product-list-barcode";
import {DisplayText} from "@syncfusion/ej2-angular-barcode-generator";


@Component({
    selector: 'app-bar-code',
    templateUrl: './bar-code.component.html',
    styleUrls: ['./bar-code.component.css']
})
export class BarCodeComponent implements OnInit {
      public displayText: DisplayText;

      form: FormGroup;
      produtos: ProductListBarcode[] = [];
      convertedProducts: SelectItem[] = [];
      produto: ProductListBarcode
      valor: string;
      qtd: number;

    constructor(
        private productService: ProductService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.carregarProdutos();
    }

      carregarProdutos(){
          this.productService.getAllSelect().subscribe(
              (res => {
                  this.produtos = res
                  console.log(this.produtos)

              }),
              () => this.messageService.add({severity:'error', summary:'Erro', detail:'Nenhum Produto Encontrado!'}),
              () => this.convertedProducts = this.convertProducts(this.produtos)
          )
      }

      convertProducts(products: ProductListBarcode[]) {
          let newList: SelectItem[] = [];
          products.forEach(product => {
              newList.push({
                  label: product.description,
                  value: {
                      id: product.id,
                      description: product.description,
                      barCode: product.barCode
                  }
              })
          })
          newList.unshift({value: null, label: "Selecione"});
          return newList;
      }

      alteraValor(){
          this.valor = this.produto.barCode;
          this.displayText.text = this.produto.description
     }
}
