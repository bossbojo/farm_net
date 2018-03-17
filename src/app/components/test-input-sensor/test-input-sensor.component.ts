import { ValidatorsConfig } from './../../configs/validators.config';
import { GlobalValueService } from './../../services/global-value.service';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { jalert } from '../../configs/alert.config';

@Component({
  selector: 'app-test-input-sensor',
  templateUrl: './test-input-sensor.component.html',
  styleUrls: ['./test-input-sensor.component.scss']
})
export class TestInputSensorComponent implements OnInit {
  TestDataSensor: FormGroup;
  TestDataSensorSoil: FormGroup;
  User: any;
  tab: string = '1';
  ImageBase64: string;
  constructor(private build: FormBuilder, private http: HttpService, private route: Router, private global: GlobalValueService) {
    this.User = this.global.User;
    this.SetDataSensor();
    this.SetDataSensorSoil();
  }
  ngOnInit() { }
  SetDataSensor() {
    this.TestDataSensor = this.build.group({
      temp: ['', [Validators.required]],
      moisture: ['', [Validators.required]],
      raining: ['', [Validators.required]],
      moisture_level: ['', [Validators.required]],
      wind: ['', [Validators.required]],
      uv: ['', [Validators.required]],
    });
  }
  SetDataSensorSoil() {
    this.TestDataSensorSoil = this.build.group({
      soil_data: ['', [Validators.required]]
    });
  }
  OnSubmitDataSensor() {
    if (this.TestDataSensor.valid) {
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "temp": this.TestDataSensor.controls['temp'].value,
        "moisture": this.TestDataSensor.controls['moisture'].value,
        "raining": this.TestDataSensor.controls['raining'].value,
        "moisture_level": this.TestDataSensor.controls['moisture_level'].value,
        "wind": this.TestDataSensor.controls['wind'].value,
        "uv": this.TestDataSensor.controls['uv'].value
      }
      this.http.requestPost(`create/data_sensor`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
          this.TestDataSensor.reset();
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    }
  }
  OnSubmitSensorSoil() {
    if (this.TestDataSensorSoil.valid) {
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "soil_data": this.TestDataSensorSoil.controls['soil_data'].value
      }
      this.http.requestPost(`create/sensor_soil`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
          this.TestDataSensorSoil.reset();
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    }
  }
  OnSubmitImage() {
    if(this.ImageBase64){
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "image": this.ImageBase64
      }
      this.http.requestPost(`create/image`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    }
  }
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ImageBase64 = reader.result;
      };
    }
  }
}
