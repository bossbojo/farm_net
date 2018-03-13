import { GlobalValueService } from './../../services/global-value.service';
import { HttpService } from './../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { jalert } from '../../configs/alert.config';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  lat: number = 15.13576435459581;
  lng: number = 104.92775917053223;
  latMark: number = 0;
  lngMark: number = 0;
  YouPoint:string;
  User: any;
  FormEditProfile:FormGroup;
  constructor(public Auth: AuthenticationService,private build:FormBuilder,private http:HttpService,private global:GlobalValueService) {
      this.User = Auth.User;
      this.SetData();
   }

  ngOnInit() {
  }
  SetData(){
    this.OnGetUser().then((res:any)=>{
      this.FormEditProfile = this.build.group({
        "firstname": [res.firstname,[Validators.required]],
        "lastname": [res.lastname,[Validators.required]],
        "email": [res.email,[Validators.required]],
        "serial_number": [res.serial_number,[Validators.required]],
      });
      this.YouPoint = "ตำเเหน่งของคุณ";
      this.latMark = res.lat;
      this.lngMark = res.lng;
    });
  }
  OnPickMap(e){
    let point = e.coords;
    this.latMark = point.lat;
    this.lngMark = point.lng;
  }
  OnSubmit(){
    if(this.FormEditProfile.valid){
      this.global.OnShowLoading();
      let obj = {
        "firstname": this.FormEditProfile.controls['firstname'].value,
        "lastname": this.FormEditProfile.controls['lastname'].value,
        "email": this.FormEditProfile.controls['email'].value,
        "serial_number": this.FormEditProfile.controls['serial_number'].value,
        "lat": this.latMark,
        "lng": this.lngMark
      };
      this.http.requestPut(`edit/profile?Id=${this.User.user_id}`,obj).subscribe((res:any)=>{
        if(res.data){
          jalert('เสร็จสิ้น','เเก้ไขข้อมูลเสร็จเรียบร้อย');
          this.global.OnHiddenLoading();
        }
      },(err:any)=>{
        jalert('เเจ้งเตือน',err.data.Message);
        this.global.OnHiddenLoading();
      });
    }else{
      jalert('เเจ้งเตือน','กรุณาตรวจสอบข้อมูลนำเข้า');
    }
  }
  OnGetUser(){
    return new Promise((resolve,reject)=>{
      this.http.requestGet(`get/users?Id=${this.User.user_id}`).subscribe((res:any)=>{
        resolve(res.data)
      },err => reject(err.data));
    });  
  }
}
