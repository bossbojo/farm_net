import { baseUrlimg } from './../../configs/url.config';
import { DatePipe } from '@angular/common';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
declare const angular;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  baseUrlimg = baseUrlimg;
  loadData: boolean = false;
  //map
  lat: number = 51.678418;
  lng: number = 7.809007;
  //last sensor
  soil;
  temp;
  uv;
  wind;
  raining;
  moisture;
  moisture_level;
  image;
  images;
  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: 'อุณหภูมิดิน' },
    { data: [], label: 'อุณหภูมิ' },
    { data: [], label: 'ความชื้น' },
    { data: [], label: 'ความเเรงลม' },
    { data: [], label: 'เเสงเเดด' },
    { data: [], label: 'ปริมาณน้ำฝน' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // อุณหภูมิดิน
      backgroundColor: 'rgba(114, 108, 53,0.2)',
      borderColor: 'rgba(114, 108, 53,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // อุณหภูมิ
      backgroundColor: 'rgba(100, 92, 214,0.2)',
      borderColor: 'rgba(100, 92, 214,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // ความชื้น
      backgroundColor: 'rgba(163, 158, 239,0.2)',
      borderColor: 'rgba(163, 158, 239,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // ความเเรงลม
      backgroundColor: 'rgba(193, 116, 117,0.2)',
      borderColor: 'rgba(193, 116, 117,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // เเสงเเดด
      backgroundColor: 'rgba(229, 255, 35,0.2)',
      borderColor: 'rgba(229, 255, 35,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { //  ปริมาณน้ำฝน
      backgroundColor: 'rgba(255, 191, 0,0.2)',
      borderColor: 'rgba(255, 191, 0,1)',
      pointBackgroundColor: 'rgba(255, 191, 0,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 191, 0,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public User: any;
  public OpenModal:boolean = false;
  public DataShow:any;
  public Label:string;
  constructor(private http: HttpService, private Auth: AuthenticationService, private datePipe: DatePipe) {
    this.GetData_moisture();
    this.GetData_moisture_level();
    this.GetData_raining();
    this.GetData_temp();
    this.GetData_uv();
    this.GetData_wind();
    this.GetDataSoil();
    this.GetImages();
    this.User = this.Auth.User;
    this.lat = this.User.lat;
    this.lng = this.User.lng;
  }
  OnShowData(Data,name){
    this.Label = name;
    this.OpenModal = true;
    this.DataShow = Data;
  }
  OnCloseModel(){
    this.DataShow = null;
    this.OpenModal = false;
  }
  GetData_moisture(){
    this.http.requestGet(`get/moisture-last`).subscribe((res: any) => {
        this.moisture = res.data.moisture;
    });
  }
  GetData_moisture_level(){
    this.http.requestGet(`get/moisture_level-last`).subscribe((res: any) => {
      if (res.data.moisture_level >= 500 && res.data.moisture_level <= 669) {
        this.moisture_level = 'ไม่มีฝน'
      } else if (res.data.moisture_level >= 250 && res.data.moisture_level <= 499) {
        this.moisture_level = 'น้อย'
      } else if (res.data.moisture_level >= 101 && res.data.moisture_level <= 249) {
        this.moisture_level = 'ปานกลาง'
      }else{
        this.moisture_level = 'มาก'
      }
    });
  }
  GetData_raining(){
    this.http.requestGet(`get/raining-last`).subscribe((res: any) => {
      this.raining = res.data.raining;
    });
  }
  GetData_temp(){
    this.http.requestGet(`get/temp-last`).subscribe((res: any) => {
      this.temp = res.data.temp;
    });
  }
  GetData_uv(){
    this.http.requestGet(`get/uv-last`).subscribe((res: any) => {
      this.uv = res.data.uv;
    });
  }
  GetData_wind(){
    this.http.requestGet(`get/wind-last`).subscribe((res: any) => {
      this.wind = res.data.wind;
    });
  }
  GetDataSoil() {
    this.http.requestGet(`get/data/sensor/soil`).subscribe((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.lineChartData[0].data.push(data[i].soil_data) //อุณหภูมิ
        if (i == data.length - 1) {
          if (data[i].soil_data >= 700  && data[i].soil_data <= 900) {
            this.soil = 'ไม่มีความชื้น'
          } else if (data[i].soil_data >= 500  && data[i].soil_data <= 699) {
            this.soil = 'น้อย'
          } else if (data[i].soil_data >= 499 && data[i].soil_data <= 300 ) {
            this.soil = 'ปานกลาง'
          }else{
            this.soil = 'มาก'
          }
        }
      }
      setTimeout(() => {
        this.loadData = true;
      }, 1000);
    });
  }
  GetImages() {
    this.http.requestGet(`get/all/images`).subscribe((res: any) => {
      this.images = res.data;
      this.image = res.data[0].image;
    });
  }
  OnChangeImage(img){
    this.image = img;
  }
  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}
