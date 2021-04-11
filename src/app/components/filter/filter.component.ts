import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  brands: Brand[] = [];
  colors: Color[] = [];
  brandId : number;
  colorId : number;
  constructor(private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getRouterLink(){
    if(this.brandId && this.colorId){
      return "/cars/filter/brand/"+this.brandId+"/color/"+this.colorId;
    }else if(this.brandId){
      return "/cars/filter/brand/"+this.brandId;
    }else if(this.colorId){
      return "/cars/filter/color/"+this.colorId;
    }else{
      return "/cars";
    }
  }
  getBrands(){
    this.brandService.getBrands().subscribe(respone => {
      this.brands = respone.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  IsCurrentBrandNull(){
    if(this.brandId){
      return true;
    }else{
      return false;
    }
  }
  getSelectedBrand(brandId:number){
    if (this.brandId == brandId) {
      return true;
    } else {
      return false;
    }
  }

  IsCurrentColorNull(){
    if(this.colorId){
      return true;
    }else{
      return false;
    }
  }

  getSelectedColor(colorId:number){
    if (this.colorId == colorId) {
      return true;
    } else {
      return false;
    }
  }

}
