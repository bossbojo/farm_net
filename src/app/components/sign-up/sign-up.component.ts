import { GlobalValueService } from './../../services/global-value.service';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { ValidatorsConfig } from './../../configs/validators.config';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { jalert, jconfirm } from '../../configs/alert.config';
import { UrlConfig } from '../../configs/url.config';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  FormSignUp: FormGroup;
  latMark: number = 0;
  lngMark: number = 0;
  YouPoint:string;
  constructor(private build: FormBuilder, private http: HttpService, private route: Router, private global: GlobalValueService) {
    this.FormSignUp = this.build.group({
      "firstname":  ['', [Validators.required]],
      "lastname":  ['', [Validators.required]],
      "email":  ['', [Validators.required]],
      "username":  ['', [Validators.required]],
      "password": ['', [Validators.required, ValidatorsConfig.comparePassword('confirmpassword')]],
      "confirmpassword": ['', [Validators.required, ValidatorsConfig.comparePassword('password')]],
      "serial_number":[this.makeid().toLocaleUpperCase(), [Validators.required, ValidatorsConfig.IsSerialNumber]],
      "user_type_id":  ['2', [Validators.required]],
      "house_no":  ['', [Validators.required]],
      "village_no":  ['', [Validators.required]],
      "sub_area": ['', [Validators.required]],
      "area": ['', [Validators.required]],
      "province":  ['', [Validators.required]],
      "postal_code":  ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }
  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 13; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  OnSubmit() {
    if (this.FormSignUp.valid) {
      this.global.OnShowLoading();
      console.log(this.FormSignUp.value);
      
      this.http.requestPost(`signup`, this.FormSignUp.value).subscribe((res: any) => {
        if (res.data) {
          jconfirm('สำเร็จ', 'คุณต้องการต้องการเข้าสู่ระบบ?').then((suc: any) => {
            if (suc){
              let signin = {
                "username": this.FormSignUp.controls['username'].value,
                "password": this.FormSignUp.controls['password'].value
              }
              this.http.requestPost(`signin`, signin).subscribe((res: any) => {
                if (res.data) {
                  this.route.navigate(['/', UrlConfig.Home]).then(() => {
                    this.global.OnHiddenLoading();
                  });
                }
                this.FormSignUp.reset();
              }, (err: any) => {
                this.global.OnHiddenLoading();
                jalert('เเจ้งเตือน', err.data.Message)
              });
            }else{
              this.route.navigate(['/', UrlConfig.Signin]).then(() => {
                this.global.OnHiddenLoading();
              });
            }
          });
        }
      }, (err: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', err.data.Message)
      });
    }else{
      jalert('เเจ้งเตือน','กรุณาตรวจสอบข้อมูลนำเข้า');
    }
  }
  onComparePassword(password: HTMLInputElement, confirm_password: HTMLInputElement) {
    if (password.value.trim() == '' || confirm_password.value.trim() == '') return;
    if (password.value === confirm_password.value) {
      this.FormSignUp.controls['password'].setErrors(null);
      this.FormSignUp.controls['confirmpassword'].setErrors(null);
    }
  }
}
