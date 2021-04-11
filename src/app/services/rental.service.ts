import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { ListResponseModel } from "../models/listResponseModel"
import { Rental } from "../models/rental"
import { RentalDetail } from "../models/rentalDetails"
import { ResponseModel } from "../models/responseModel"

@Injectable({
    providedIn: 'root'
  })
  export class RentalService {
  
    apiUrl="https://localhost:44309/api/"
  
    constructor(private httpClient:HttpClient) { }
  
    getRentals():Observable<ListResponseModel<Rental>>{
      let newPath = this.apiUrl + 'rentals/getrentaldetails'
      return this.httpClient.get<ListResponseModel<Rental>>(newPath);
    }
    getRentalByCarId(carId : number):Observable<ListResponseModel<Rental>>{
      let newPath = this.apiUrl + 'rentals/getrentaldetailbycarId?carId=' + carId;
      return this.httpClient.get<ListResponseModel<Rental>>(newPath);
    }
    payRental(rental:Rental, amount:number){
      let newPath = this.apiUrl + 'rentals/add';
      return this.httpClient.post<ResponseModel>(newPath,{payment:{amount:amount},rental:{rental}})
    }
    addRental(rental:Rental){
      let newPath = this.apiUrl + 'rentals/add'
      this.httpClient.post(newPath,rental).subscribe()
    }

    userRentalCars(id : number) : Observable<ListResponseModel<RentalDetail>>{
      return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl+"userrentalcars?id="+id)
    }
  
  }