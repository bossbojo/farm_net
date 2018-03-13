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
  lat: number = 15.13576435459581;
  lng: number = 104.92775917053223;
  latMark: number = 0;
  lngMark: number = 0;
  YouPoint:string;
  constructor(private build: FormBuilder, private http: HttpService, private route: Router, private global: GlobalValueService) {
    this.FormSignUp = this.build.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, ValidatorsConfig.IsEmail]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, ValidatorsConfig.comparePassword('confirmpassword')]],
      confirmpassword: ['', [Validators.required, ValidatorsConfig.comparePassword('password')]],
      serial_number: ['', [Validators.required, ValidatorsConfig.IsSerialNumber]],
    });
  }

  ngOnInit() {
  }
  OnPickMap(e){
    this.YouPoint = "ตำเเหน่งของคุณ";
    let point = e.coords;
    this.latMark = point.lat;
    this.lngMark = point.lng;
  }
  OnSubmit() {
    if (this.FormSignUp.valid) {
      if(this.latMark == 0&&this.lngMark == 0){
        jalert('เเจ้งเตือน','กรุณาเลือกตำเเหน่งของคุณ');
        return;
      }
      this.global.OnShowLoading();
      let obj = {
        "firstname": this.FormSignUp.controls['firstname'].value,
        "lastname": this.FormSignUp.controls['lastname'].value,
        "email": this.FormSignUp.controls['email'].value,
        "username": this.FormSignUp.controls['username'].value,
        "password": this.FormSignUp.controls['password'].value,
        "serial_number": this.FormSignUp.controls['serial_number'].value,
        "lat": this.latMark,
        "lng": this.lngMark,
        "user_type_id": 2
      }
      this.http.requestPost(`signup`, obj).subscribe((res: any) => {
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
