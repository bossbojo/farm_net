import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import { GlobalValueService } from './../../services/global-value.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { jalert } from '../../configs/alert.config';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  Users:any;
  FormSetting:FormGroup;
  constructor(private http:HttpService,private Global:GlobalValueService,private Auth:AuthenticationService,private build:FormBuilder) {
    this.Users =this.Auth.User;
    this.GetDataSetting();
    this.build
    this.SetForm();
   }

  ngOnInit() {
  }
  SetForm(){
    this.FormSetting = this.build.group({
        "temp": ['',[Validators.required]],
        "moisture": ['',[Validators.required]],
        "raining": ['',[Validators.required]],
        "wind": ['',[Validators.required]],
        "uv": ['',[Validators.required]],
        "soil": ['',[Validators.required]],
        "image": ['',[Validators.required]],
    });
  }
  GetDataSetting(){
    this.http.requestGet(`get/setting?serial_number=${this.Users.serial_number}`).subscribe((res:any)=>{
      if(res.data.length > 0){
        this.FormSetting.setValue({
            "temp": res.data[0].temp,
            "moisture":res.data[0].moisture,
            "raining": res.data[0].raining,
            "wind": res.data[0].wind,
            "uv": res.data[0].uv,
            "soil":res.data[0].soil,
            "image":res.data[0].image,
        });
      }
    });
  }
  OnSubmit(){
    if(this.FormSetting.valid){
      this.Global.OnShowLoading();
      this.http.requestPut(`update/setting?id=${this.Users.user_id}`,this.FormSetting.value)
      .subscribe((res:any)=>{
        this.GetDataSetting();
        this.Global.OnHiddenLoading();
      },err =>{
        this.Global.OnHiddenLoading();
        jalert('เเจ้งเตือน', err.data.Message)
      });
    }
  }

}
