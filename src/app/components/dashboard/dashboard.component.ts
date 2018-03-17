import { DatePipe } from '@angular/common';
import { baseUrlimg } from './../../configs/url.config';
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
  image;
  // lineChart
  public lineChartData: Array<any> = [
    { data: [], label: 'อุณหภูมิดิน' },
    { data: [], label: 'อุณหภูมิ' },
    { data: [], label: 'ความชื้น' },
    { data: [], label: 'ความเเรงลม' },
    { data: [], label: 'เเสงเเดด' }
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
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public User:any;
  constructor(private http: HttpService,private Auth:AuthenticationService,private datePipe: DatePipe ) {
    this.GetData();
    this.GetDataSoil();
    this.GetImage();
    this.User = this.Auth.User;
    this.lat = this.User.lat;
    this.lng = this.User.lng;
  }
  GetData() {
    this.http.requestGet(`get/data/sensor/main`).subscribe((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.lineChartLabels.push(this.datePipe.transform(data[i].date,'dd/MM/yyyy') + ' ' + data[i].hour+'hr');
        this.lineChartData[1].data.push(data[i].temp) //อุณหภูมิ
        this.lineChartData[2].data.push(data[i].moisture) //ความชื้น
        this.lineChartData[3].data.push(data[i].wind) //ความเเรงลม
        this.lineChartData[4].data.push(data[i].uv) //เเสงเเดด
        if(i == data.length-1){
          this.temp = data[i].temp;
          this.uv = data[i].uv;
          this.wind = data[i].wind;
          this.raining = data[i].raining;
          this.moisture = data[i].moisture;
        }
      }
    });
  }
  GetDataSoil(){
    this.http.requestGet(`get/data/sensor/soil`).subscribe((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.lineChartData[0].data.push(data[i].soil_data) //อุณหภูมิ
        if(i == data.length-1){
          this.soil = data[i].soil_data;
        }
      }
    });
  }
  GetImage(){
    this.http.requestGet(`get/image`).subscribe((res: any) => {
      this.image = res.data.image;
    });
  }
  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
   // console.log(e);
  }
}
