import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductModel} from '../../../models/product.model';
import {FileUpload, MessageService, SelectItem} from 'primeng';
import {ProductService} from '../../../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
    items: SelectItem[] = [
        {label: 'Peso (Kg)', value: true},
        {label: 'Unidade (Un)', value: false}
    ];
    productForm: FormGroup;
    currentProductId: number;
    categories: SelectItem[];
    currentAction: string;

    @ViewChild('productImage') productImageElementRef: FileUpload;

    constructor(
        private messageService: MessageService,
        private route: ActivatedRoute,
        private productService: ProductService,
        private router: Router
    ) {
        this.productForm = new FormGroup({
            id: new FormControl(''),
            description: new FormControl('', [Validators.required]),
            inventoryAmount: new FormControl(0.0),
            inventoryWeight: new FormControl(0.0),
            barCode: new FormControl('', [Validators.required]),
            rfid: new FormControl('', [Validators.required]),
            purchasePrice: new FormControl('', [Validators.required]),
            salePrice: new FormControl('', [Validators.required]),
            isCoffeeShop: new FormControl(false),
            categoryId: new FormControl('', [Validators.required]),
            image: new FormControl(''),
            weight: new FormControl(true),
        });
    }

    ngOnInit(): void {
        this.getCategories();
        this.setAction();
        if (this.currentAction === 'edit') {
            this.loadProduct();
        }
    }

    private setAction(): void {
        if (this.route.snapshot.url[0].path === 'editar') {
            this.currentAction = 'edit';
        } else {
            this.currentAction = 'new';
        }
    }

    loadProduct(): void {
        this.currentProductId = Number(this.route.snapshot.paramMap.get('productId'));
        this.productService.readById(this.currentProductId)
            .subscribe((product) => this.updateForm(product),
                       (error) => this.messageService.add({severity: "error", summary: "Erro", detail: "error.error.message"}))
    }

    updateForm(product: ProductModel): void {
        this.productForm.patchValue(product);
        this.productImageElementRef.files[0] = this.base64ToFile(product.image, product.description);
    }

    getCategories(): void {
        this.productService.findAllCategories().subscribe(
            (res) => {
                if(res){
                    this.categories = res;
                    this.messageService.add({severity: "success", summary: "Sucesso", detail: "Categorias Listadas"});
                }
            }, (error) => this.messageService.add({severity: "error", summary: "error", detail: "error.error.detail"}))
    }

    private base64ToFile(base64: string, filename: string): File {
        const base64Substrings: string[] = base64.split(',');
        const type = base64Substrings[0].match(/:(.*?);/)[1];
        const blob = atob(base64Substrings[1]);
        let size: number = blob.length;
        const u8arr: Uint8Array = new Uint8Array(size);

        while (size--) {
            u8arr[size] = blob.charCodeAt(size);
        }
        const semdo: File = new File([u8arr], filename, {type});

        return semdo;
    }

    private convertBase64(file: File): Promise<string> {
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
            this.messageService.add({severity: "error", summary: "Erro", detail: "Formul??rio Inv??lido"});
            return;
        }
        const image: string = await this.convertBase64(this.productImageElementRef.files[0]);
        const newProduct: ProductModel = {...this.productForm.value, image};
        if (this.currentAction === 'edit') {
            this.productService.update(newProduct).subscribe(
                () => {
                    this.messageService.add({severity: "success", summary: "Sucesso", detail: "Produto alterado com sucesso!"});
                    this.router.navigateByUrl('admin/produtos');
                },
                () => this.messageService.add({severity: "error", summary: "Erro", detail: "Erro ao alterar produto!"}));
        } else {
            if (this.productForm.value.weight) newProduct.inventoryAmount = null;
            else newProduct.inventoryWeight = null;
            this.productService.create(newProduct).subscribe(
                () => {
                    alert('Produto criado com sucesso!');
                    this.router.navigateByUrl('admin/produtos');
                },
                () => this.messageService.add({severity: "error", summary: "Erro", detail: "Erro ao criar produto!"}));
        }
    }

    get hasProductImage(): boolean {
        return this.productImageElementRef.files.length === 0;
    }
}
