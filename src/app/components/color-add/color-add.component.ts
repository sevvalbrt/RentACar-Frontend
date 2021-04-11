import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  operationType: string;
  colorForm: FormGroup;
  currentColorId: number;
  color:Color;

  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private router: Router,
    private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['color']) {
        this.operationType = 'Update';
        this.createColorEditForm(params['color']);
      } else {
        this.createColorAddForm();
        this.operationType = 'Add';
      }
    });
  }

  createColorEditForm(colorId: number) {
    this.currentColorId = colorId;

    this.colorForm = this.formBuilder.group({
      colorId:[''],
      colorName: ['', Validators.required]
    });
    

    this.colorService.getById(colorId).subscribe((response) => {
      this.color = response.data;
      this.colorForm.setValue({
        colorId: this.color.colorId,
        colorName: this.color.colorName,
      });
    });
    
  }

  createColorAddForm(){
    this.colorForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  addColor(){
    if(this.colorForm.valid){
      let colorModel=Object.assign({},this.colorForm.value)
      this.colorService.add(colorModel).subscribe(response=>{   
        this.toastrService.success(response.message,"başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası"); 
          }
        }
      })
    }else{
      this.toastrService.error("formunuz eksik","başarısız")
    } 
  }

  updateColor() {
    if (this.colorForm.valid) {
      let colorModel = Object.assign({}, this.colorForm.value);
      colorModel.carId = this.color.colorId;
      this.colorService.update(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.success(responseError.message);
        }
      );
    } else {
      this.toastrService.error('Form eksik', 'Hata');
    }
  }
  

}
