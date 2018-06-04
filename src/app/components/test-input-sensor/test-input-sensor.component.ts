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
  User: any;
  tab: string = '2';
  ImageBase64: string;
  constructor(private build: FormBuilder, private http: HttpService, private route: Router, private global: GlobalValueService) {
    this.User = this.global.User;
    this.SetDataSensor();
  }
  ngOnInit() { }
  SetDataSensor() {
    this.TestDataSensor = this.build.group({
      sensor_data: ['', [Validators.required]],
      select: ['', [Validators.required]]
    });
  }
  OnSubmit() {
    if (this.TestDataSensor.value.select == 1)
      this.Sensor_wind();
    else if (this.TestDataSensor.value.select == 2)
      this.Sensor_raining();
    else if (this.TestDataSensor.value.select == 3)
      this.Sensor_temp();
    else if (this.TestDataSensor.value.select == 4)
      this.Sensor_moisture();
    else if (this.TestDataSensor.value.select == 5)
      this.Sensor_moisture_level();
    else if (this.TestDataSensor.value.select == 6)
      this.Sensor_uv();
    else if (this.TestDataSensor.value.select == 7)
      this.SensorSoil();
  }
  //1
  Sensor_wind() {
    if (this.TestDataSensor.valid) {
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "wind": this.TestDataSensor.controls['sensor_data'].value
      }
      this.http.requestPost(`save/wind`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
          this.TestDataSensor.reset();
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    } else {
      jalert('เเจ้งเตือน', 'กรุณาใส่ข้อมูล');
    }
  }
  //2
  Sensor_raining() {
    if (this.TestDataSensor.valid) {
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "raining": this.TestDataSensor.controls['sensor_data'].value
      }
      this.http.requestPost(`save/raining`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
          this.TestDataSensor.reset();
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    } else {
      jalert('เเจ้งเตือน', 'กรุณาใส่ข้อมูล');
    }
  }
  //3
  Sensor_temp() {
    if (this.TestDataSensor.valid) {
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "temp": this.TestDataSensor.controls['sensor_data'].value
      }
      this.http.requestPost(`save/temp`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
          this.TestDataSensor.reset();
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    } else {
      jalert('เเจ้งเตือน', 'กรุณาใส่ข้อมูล');
    }
  }
  //4
  Sensor_moisture() {
    if (this.TestDataSensor.valid) {
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "moisture": this.TestDataSensor.controls['sensor_data'].value
      }
      this.http.requestPost(`save/moisture`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
          this.TestDataSensor.reset();
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    } else {
      jalert('เเจ้งเตือน', 'กรุณาใส่ข้อมูล');
    }
  }
  //5
  Sensor_moisture_level() {
    if (this.TestDataSensor.valid) {
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "moisture_level": this.TestDataSensor.controls['sensor_data'].value
      }
      this.http.requestPost(`save/moisture_level`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
          this.TestDataSensor.reset();
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    } else {
      jalert('เเจ้งเตือน', 'กรุณาใส่ข้อมูล');
    }
  }
  //6
  Sensor_uv() {
    if (this.TestDataSensor.valid) {
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "uv": this.TestDataSensor.controls['sensor_data'].value
      }
      this.http.requestPost(`save/uv`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
          this.TestDataSensor.reset();
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    } else {
      jalert('เเจ้งเตือน', 'กรุณาใส่ข้อมูล');
    }
  }
  //7
  SensorSoil() {
    if (this.TestDataSensor.valid) {
      this.global.OnShowLoading();
      let obj = {
        "serial_number": this.User.serial_number,
        "soil_data": this.TestDataSensor.controls['sensor_data'].value
      }
      this.http.requestPost(`create/sensor_soil`, obj).subscribe((res: any) => {
        if (res.data) {
          this.global.OnHiddenLoading();
          jalert('เสร็จสิ้น', 'เพิ่มข้อมูลเสร็จเรียบร้อย');
          this.TestDataSensor.reset();
        }
      }, (res: any) => {
        this.global.OnHiddenLoading();
        jalert('เเจ้งเตือน', res.data.Message);
      });
    } else {
      jalert('เเจ้งเตือน', 'กรุณาใส่ข้อมูล');
    }
  }
  OnSubmitImage() {
    if (this.ImageBase64) {
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
