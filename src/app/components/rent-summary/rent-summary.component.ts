 import { Component, OnInit } from '@angular/core';
 import { ToastrService } from 'ngx-toastr';
 import { Car } from 'src/app/models/car';
import { RentalDetail } from 'src/app/models/rentalDetails';
 import { RentCar } from 'src/app/models/rentCar';
import { AuthService } from 'src/app/services/auth.service';
 import { RentService } from 'src/app/services/rent.service';
import { RentalService } from 'src/app/services/rental.service';

 @Component({
   selector: 'app-rent-summary',
   templateUrl: './rent-summary.component.html',
   styleUrls: ['./rent-summary.component.css']
 })
 export class RentSummaryComponent implements OnInit {
  userId: number;
  rentals: RentalDetail[] = [];
   constructor(private rentalService: RentalService,
    private authService: AuthService) { }

   ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
    this.getUserRentalCars();
   }

  //  getRent(){
  //    this.rentCars=this.rentService.list();
  //  }

  //  removeFromRent(car:Car){
  //    this.rentService.removeFromRent(car);
  //    this.toastrService.error("Silindi",car.description)
  //  }

  getUserRentalCars() {
    this.rentalService.userRentalCars(this.userId).subscribe(
      (response) => {
        console.log(response);
        this.rentals = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
 }
