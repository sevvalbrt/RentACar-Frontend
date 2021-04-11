import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44309/api/users/"

  constructor(private httpClient: HttpClient) { }

  update(user:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update" ,user);
  }

  getByUserId(id:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "getbyid?userId=" + id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }


  getUserFindexByUserId(userId:number):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "users/getbyid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

}
