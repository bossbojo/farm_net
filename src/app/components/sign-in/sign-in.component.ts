import { UrlConfig } from './../../configs/url.config';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalValueService } from '../../services/global-value.service';
import { Router } from '@angular/router';
import { jalert } from '../../configs/alert.config';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  FormSignIn: FormGroup;
  constructor(private build: FormBuilder, private http: HttpService, private global: GlobalValueService, private route: Router) {
    this.FormSignIn = this.build.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }
  OnSubmit() {
    if (this.FormSignIn.valid) {
      this.global.OnShowLoading();
      let obj = {
        "username": this.FormSignIn.controls['username'].value,
        "password": this.FormSignIn.controls['password'].value
      };
      this.http.requestPost(`signin`, obj).subscribe((res: any) => {
        if (res.data) {
          this.route.navigate(['/', UrlConfig.Home]).then(() => {
            this.global.OnHiddenLoading();
          });
        }
      },(err:any) => {
        console.log(err);
        jalert('เเจ้งเตือน',err.data.Message);
        this.global.OnHiddenLoading();
      });
    }
  }

}
