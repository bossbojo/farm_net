import { AuthenticationService } from './../../services/authentication.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsConfig } from '../../configs/validators.config';
import { jalert } from '../../configs/alert.config';
import { GlobalValueService } from '../../services/global-value.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  FormChangePassword:FormGroup;
  User:any;
  constructor(private build:FormBuilder,private http:HttpService,private Auth:AuthenticationService,private global:GlobalValueService) {
    this.User = this.Auth.User;
    this.FormChangePassword = this.build.group({
      oldpassword:['',[Validators.required]],
      newpassword:['',[Validators.required,ValidatorsConfig.comparePassword('confirmpassword')]],
      confirmpassword:['',[Validators.required,ValidatorsConfig.comparePassword('newpassword')]],
    });
   }

  ngOnInit() {
  }
  OnSubmit(){
    if(this.FormChangePassword.valid){
      this.global.OnShowLoading();
      let obj = {
        "new_password": this.FormChangePassword.controls['confirmpassword'].value,
        "old_password": this.FormChangePassword.controls['oldpassword'].value
      };
      this.http.requestPut(`edit/password?Id=${this.User.user_id}`,obj).subscribe((res:any)=>{
        if(res.data){
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น','เเก้ไขข้อมูลเสร็จเรียบร้อย');
        }
      },(res:any)=>{
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน',res.data.Message);
      });
    }else{
      jalert('เเจ้งเตือน','กรุณาตรวจสอบข้อมูลนำเข้า');
    }
  }
}
