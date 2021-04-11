import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44309/api/auth/"
  jwtHelper: JwtHelperService = new JwtHelperService();

  userName: string;
  userId: number;
  roles:string[];

  constructor(private httpClient:HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private localStorageService: LocalStorageService) {
      this.setUserId()
      this.setRoles();
     }

     login(loginModel:LoginModel){
      return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
    }

  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register", registerModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  setUserId(){
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"));
      var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
      this.userId = Number(decoded[propUserId]);
    }
  }

  getUserId():number{
    return this.userId;
  }

  setRoles(){
    if (this.localStorageService.get("token")) {
      var decoded = this.jwtHelper.decodeToken(this.localStorageService.get("token"));
      var role = Object.keys(decoded).filter(x => x.endsWith("/role"))[0];
      this.roles = (decoded[role])
    }
  }

  isAdmin(){
    if (this.roles.includes("admin")) {
      return true
    }
    return false;
  }

}

