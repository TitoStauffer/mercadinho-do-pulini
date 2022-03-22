import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../admin/models/loginModel';
import { UserModel } from '../admin/models/userModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = 'api/users/login';

  constructor(private http: HttpClient) { }

  login(credentials: LoginModel){
    return this.http.post<UserModel>(this.api, credentials);
  }
}
