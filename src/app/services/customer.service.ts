import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customerDetails';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "https://localhost:44309/api/";

  constructor(private httpClient: HttpClient) {}

  getCustomers() : Observable<ListResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl+"customers/getallcustomerdetail"
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerById(customerId: number): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getbyid?id=' + customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  add(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",customer);
  }
}
