import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';

import { CarService } from 'src/app/services/car.service';
import { RentService } from 'src/app/services/rent.service';
// import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  carDetails:CarDetail[]=[];
  currentCar:Car;
  dataLoaded=false;
  filterText="";
  imageBasePath = "https://localhost:44309/images/";
  
  
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute, 
    private toastrService:ToastrService,
    private rentService:RentService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"] && params["colorId"]) {
        this.getCarDetails(params["brandId"],params["colorId"]);
      }else if(params["brandId"]){
        this.getCarByBrand(params["brandId"])   
      }
      else if(params["colorId"]){
        this.getCarByColor(params["colorId"])
      }else if(params["carId"]){
        this.getCarDetail(params["carId"])
      }
      else{

        this.getCars()
        if(params['filterText']){
          this.filterText=params['filterText']
        }

      }
    })

  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
   
  }

  getCarDetail(carId:number){
    this.carService.getCarDetail(carId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
   
  }


  getCarByBrand(brandId:number){
    this.carService.getCarByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
   
  }

  getCarByColor(colorId:number){
    this.carService.getCarByColor(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
   
  }

   rentACar(car:Car){
     if(car.carId===1){
       this.toastrService.error("araba kiralanamaz")
     }else{
     this.toastrService.success("Araba kiralandı",car.description)
     this.rentService.rentACar(car);
     }
   }

   getCarDetails(brandId:number, colorId:number){
    this.carService.getCarDetails(brandId, colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarImage(car:Car){

    if(car.imagePath){
      return car.imagePath
    }
    else{
      return 'default.png'
    }
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  // getCurrentImageClass(image: CarImage) {
  //   if (image == this.carImages[0]) {
  //     return 'carousel-item active';
  //   } else {
  //     return 'carousel-item';
  //   }
  // }

  
  

  

}
