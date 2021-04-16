import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../models/brand';
import { BrandService } from '../services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  operationType: string;
  brandForm: FormGroup;
  currentBrandId: number;
  brand:Brand;

  constructor(private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private router: Router,
    private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activetedRoute.params.subscribe((params) => {
      if (params['brand']) {
        this.operationType = 'Update';
        this.createBrandEditForm(params['brand']);
      } else {
        this.createBrandAddForm();
        this.operationType = 'Add';
      }
    });
  }

  createBrandEditForm(brandId: number) {
    this.currentBrandId = brandId;

    this.brandForm = this.formBuilder.group({
      brandId:[''],
      brandName: ['', Validators.required]
    });
    

    this.brandService.getById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.brandForm.setValue({
        brandId: this.brand.brandId,
        brandName: this.brand.brandName,
      });
    });
    
  }

  createBrandAddForm() {
    this.brandForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }

  addBrand() {
    if (this.brandForm.valid) {
      let brand = Object.assign({}, this.brandForm.value);
      this.brandService.add(brand).subscribe((response) => {
      this.toastrService.success(response.message,"Successfully");
      this.router.navigate(["/brands/getall"])
      },responseError=> {
         if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Dogrulama hatasi'
              );
            }
          }
      });
    } else {
      this.toastrService.error('Form Invalid');
    }
  }

  updateBrand() {
    if (this.brandForm.valid) {
      let brandModel = Object.assign({}, this.brandForm.value);
      brandModel.carId = this.brand.brandId;
      this.brandService.update(brandModel).subscribe(
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
