import {Component, Input} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {Relatorio1Model} from "../../models/relatorio1.model";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
    selector: 'app-relatorio1',
    templateUrl: './relatorios.component.html',
})
export class RelatoriosComponent {

    cols = [
        {header: 'Nome', field: 'description'},
        {header: 'Valor Total', field: 'totalValue'},
        {header: 'Quantidade', field: 'quantidade'},
    ];

    header = [];
    tableData = [];

    dataInicio: Date = null;
    dateFim: Date = null;

    @Input() totalValue: number;
    @Input() itens: Relatorio1Model[] = [];

    constructor(private productService: ProductService) { }

    findAll(relatorio: string) {
        if (!this.dataInicio || !this.dateFim) {
            return;
        }

        this.productService[relatorio]({dataInicio: this.dataInicio, dataFim: this.dateFim}).subscribe(users => {
            this.itens = users;
            if (relatorio === 'relatorio1') {
                this.header = [['Nome', 'Valor Total', 'Quantidade']];
            } else {
                this.header = [['Nome', 'Valor Total']];
            }
            this.tableData = users.map(item => {
                return relatorio === 'relatorio1' ? [item.description, item.totalValue, item.quantidade] : [item.description, item.totalValue];
            });
            this.generatePdf();
        });
    }

    generatePdf() {
        const pdf = new jsPDF();

        pdf.setFontSize(14);
        pdf.text(`Periodo ${this.dataInicio.toLocaleDateString()} - ${this.dateFim.toLocaleDateString()}`, 11, 8);
        pdf.setFontSize(12);
        pdf.setTextColor(99);

        (pdf as any).autoTable({
            head: this.header,
            body: this.tableData,
            theme: 'plain',
        })

        pdf.output('dataurlnewwindow')

        pdf.save('table.pdf');
    }

}
