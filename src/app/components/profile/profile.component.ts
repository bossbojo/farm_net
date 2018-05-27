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
        "house_no": [res.house_no,[Validators.required]],
        "village_no": [res.village_no,[Validators.required]],
        "sub_area": [res.sub_area,[Validators.required]],
        "area": [res.area,[Validators.required]],
        "province": [res.province,[Validators.required]],
        "postal_code": [res.postal_code,[Validators.required]]
      });
      this.YouPoint = "ตำเเหน่งของคุณ";
      this.latMark = res.lat;
      this.lngMark = res.lng;
    });
  }
  OnSubmit(){
    if(this.FormEditProfile.valid){
      this.global.OnShowLoading();
      this.http.requestPut(`edit/profile?Id=${this.User.user_id}`,this.FormEditProfile.value).subscribe((res:any)=>{
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
