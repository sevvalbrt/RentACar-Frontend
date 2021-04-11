import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';

import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { CarService } from 'src/app/services/car.service';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars:Car;
  carImages:CarImage[]=[];
  currentImage:CarImage;
  imageBasePath="https://localhost:44309/images/"

  constructor(private carService:CarService,
    private imageService:CarImagesService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private rentService:RentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetail(params["carId"]) 
        this.getImagesByCarId(params["carId"])  
      }
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

  getCarDetail(carId:number){
    this.carService.getCarDetail(carId).subscribe((response) =>{
    this.cars = response.data[0]
  })
}

getImagesByCarId(carId:number){
  this.imageService.getCarImages(carId).subscribe(response => {
    this.carImages=response.data;
  })
}

getCarImage(car:CarImage){
  if(car.imagePath){
    return car.imagePath
  }
  else{
    return 'default.png'
  }
}

  


}
