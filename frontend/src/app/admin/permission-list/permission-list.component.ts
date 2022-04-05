import {Component, Input, OnInit} from '@angular/core';
import {PerfilEnum} from "../../shared/Utils/PerfilEnum";
import {TelaEnum} from "../../shared/Utils/TelaEnum";

@Component({
  selector: 'app-user-list',
  templateUrl: './permission-list.component.html',
})
export class PermissionListComponent implements OnInit {

    cols = [
        {header: 'Nome', field: 'name'},
        {header: 'Telas', field: 'tela'},
    ];

    @Input() totalValue: number;
    @Input() itens: any[] = [
        {name: PerfilEnum.Admin, tela: TelaEnum.Dashboard.name + ', ' + TelaEnum.Usuario.name + ', ' + TelaEnum.Permissaes.name + ', ' + TelaEnum.Produto.name + ', ' + TelaEnum.Venda.name },
        {name: PerfilEnum.Cliente, tela: TelaEnum.Dashboard.name},
        {name: PerfilEnum.Caixa, tela: TelaEnum.Dashboard.name + ', ' +  TelaEnum.Produto.name + ', ' + TelaEnum.Venda.name },
        {name: PerfilEnum.Estoque, tela: TelaEnum.Dashboard.name + ', ' + TelaEnum.Produto.name },
        {name: PerfilEnum.Recepcao, tela: TelaEnum.Dashboard.name + ', ' + TelaEnum.Usuario.name + ', ' + TelaEnum.Permissaes.name },
    ];

    constructor() { }

    ngOnInit(): void {

    }

}
