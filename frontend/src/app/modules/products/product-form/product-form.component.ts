import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductModel} from '../../../models/product.model';
import {FileUpload, SelectItem} from 'primeng';
import {ProductService} from '../../../shared/services/product.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

    productForm: FormGroup;
    categories: SelectItem[];
    @ViewChild('productImage') productImageElementRef: FileUpload;

    constructor(private productService: ProductService, private router: Router) {
        this.productForm = new FormGroup({
            description: new FormControl('', [Validators.required]),
            inventoryAmount: new FormControl(''),
            inventoryWeight: new FormControl(''),
            barCode: new FormControl('', [Validators.required]),
            rfid: new FormControl('', [Validators.required]),
            purchasePrice: new FormControl('', [Validators.required]),
            salePrice: new FormControl('', [Validators.required]),
            isCoffeeShop: new FormControl(false),
            categoryId: new FormControl('', [Validators.required]),
            image: new FormControl(''),
        });
    }

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories(): void {
        this.categories = [
            {
                value: 1,
                label: 'Massas'
            },
            {
                value: 2,
                label: 'Destilados'
            }
        ];
    }

    convertBase64(file: File): Promise<string> {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = event => {
                resolve(event?.target?.result?.toString());
            };

            reader.readAsDataURL(file);
        });
    }


    async handleSubmitForm(): Promise<void> {
        if (this.productForm.invalid || this.hasProductImage) {
            alert('Formulário Inválido');
            return;
        }
        const image: string = await this.convertBase64(this.productImageElementRef.files[0]);
        const newProduct: ProductModel = {...this.productForm.value, image};
        // newProduct.categoryId = this.productForm.value.categoryId.id;
        console.log(newProduct);
        this.productService.create(newProduct).subscribe(
            () => {
                alert('Produto criado com sucesso!');
                this.router.navigateByUrl('produtos');
            },
            () => alert('Erro ao criar produto!')
        );
    }

    get hasProductImage(): boolean {
        return this.productImageElementRef.files.length === 0;
    }
}
