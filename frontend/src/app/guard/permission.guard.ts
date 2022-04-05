import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {UserModel} from "../models/user.model";
import {TelaEnum} from "../shared/Utils/TelaEnum";
import {PerfilEnum} from "../shared/Utils/PerfilEnum";

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private rout: Router){};

  telasCliente = [TelaEnum.Dashboard.path];
  telasCaixa = [TelaEnum.Dashboard.path, TelaEnum.Produto.path, TelaEnum.Venda.path];
  telasEstoque = [TelaEnum.Dashboard.path, TelaEnum.Produto.path];
  telasRecepcao = [TelaEnum.Dashboard.path, TelaEnum.Usuario.path, TelaEnum.Permissaes.path];

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user: UserModel = JSON.parse(localStorage.getItem('user'));

      const tela = next.url[0].path;

      if (this.checkPermission(tela, user.profile)) {
        return true;
      }

      this.rout.navigate(['./admin']);
      return false;
  }

  checkPermission(tela: string, perfil: string): boolean {
      if (PerfilEnum.Admin === perfil) {
          return true;
      }
      if (PerfilEnum.Caixa === perfil && this.telasCaixa.includes(tela)) {
          return true;
      }
      if (PerfilEnum.Cliente === perfil && this.telasCliente.includes(tela)) {
          return true;
      }
      if (PerfilEnum.Estoque === perfil && this.telasEstoque.includes(tela)) {
          return true;
      }
      return PerfilEnum.Recepcao === perfil && this.telasRecepcao.includes(tela);

  }

}
