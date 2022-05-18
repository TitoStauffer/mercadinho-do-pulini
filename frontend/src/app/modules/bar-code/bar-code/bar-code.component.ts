import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { FormGroup} from "@angular/forms";
import {MessageService, SelectItem} from "primeng";
import {ProductService} from "../../../shared/services/product.service";
import {ProductListBarcode} from "../../../models/product-list-barcode";
import {DisplayTextModel} from "@syncfusion/ej2-angular-barcode-generator";

@Component({
    selector: 'app-bar-code',
    templateUrl: './bar-code.component.html',
    styleUrls: ['./bar-code.component.css']
})
export class BarCodeComponent implements OnInit{
    @ViewChild('barcode')
    @ViewChild('displayText')
    public displayText: DisplayTextModel
    form: FormGroup;
    produtos: ProductListBarcode[] = [];
    convertedProducts: SelectItem[] = [];
    produto: ProductListBarcode
    qtdPrintIndividual: number;
    qtd: number
    qtdLinhasArray: number[] = [];
    maisDeUmaLinha: boolean = false;

    constructor(
        private productService: ProductService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.carregarProdutos();
    }

    carregarProdutos(){
          this.productService.getAllSelect().subscribe(
              (res) => this.produtos = res,
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

    atualizaValor(){
       this.setarDisplayTest();
       this.calculaQtdLinhas();
       this.calculaQtdIndividual();
    }

    setarDisplayTest(){
        this.displayText = {
            text: this.produto.description.toUpperCase()
        }
    }

    calculaQtdLinhas(){
        this.qtdLinhasArray = new Array(Math.floor(this.qtd / 3));
        this.maisDeUmaLinha = Math.floor(this.qtd / 3) > 1;
    }

    calculaQtdIndividual(){
        this.qtdPrintIndividual = this.qtd % 3;
    }
}
