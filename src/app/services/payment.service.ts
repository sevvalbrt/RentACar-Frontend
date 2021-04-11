import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = "https://localhost:44309/api/";

  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "payments/add",payment);
  }

  checkPayment(payment:Payment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "payments/checkpayment",payment);
  }

  pay(rental:Rental,amount:number){
    let path = this.apiUrl + "rentals/paymentadd";
    this.httpClient.post<ResponseModel>(path,{payment:{amount:amount},rental:rental});

}
}