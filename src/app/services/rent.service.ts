 import { Injectable } from '@angular/core';
 import { Car } from '../models/car';
 import { RentCar } from '../models/rentCar';
 import { RentCars } from '../models/rentCars';

 @Injectable({
   providedIn: 'root'
 })
 export class RentService {

   constructor() { }

   rentACar(car:Car){
     let item=RentCars.find(c=>c.car.carId===car.carId);
     if(item){
       item.quantity+=1;
     }else{
       let rentCar=new RentCar();
       rentCar.car=car;
       rentCar.quantity=1;
       RentCars.push(rentCar)
     }
   }

   removeFromRent(car:Car){
     let item:RentCar = RentCars.find(c=>c.car.carId===car.carId);
     RentCars.splice(RentCars.indexOf(item),1);
   }

   list():RentCar[]{
     return RentCars;
   }
 }
