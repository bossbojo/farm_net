import { baseUrlimg, UrlConfig } from './../../configs/url.config';
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
  Url = UrlConfig
  tab = 'All';
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
  imagesSensor;
  // lineChart
  public lineChartDataSoil: Array<any> = [];
  public lineChartLabelsSoil: Array<any> = [];
  public lineChartDataTemp: Array<any> = [];
  public lineChartLabelsTemp: Array<any> = [];
  public lineChartDataUv: Array<any> = [];
  public lineChartLabelsUv: Array<any> = [];
  public lineChartDataWind: Array<any> = [];
  public lineChartLabelsWind: Array<any> = [];
  public lineChartDataMoisture: Array<any> = [];
  public lineChartLabelsMoisture: Array<any> = [];
  public lineChartDataMoistureLevel: Array<any> = [];
  public lineChartLabelsMoistureLevel: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(114, 108, 53,0.2)',
      borderColor: 'rgba(114, 108, 53,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(100, 92, 214,0.2)',
      borderColor: 'rgba(100, 92, 214,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      backgroundColor: 'rgba(163, 158, 239,0.2)',
      borderColor: 'rgba(163, 158, 239,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(193, 116, 117,0.2)',
      borderColor: 'rgba(193, 116, 117,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      backgroundColor: 'rgba(229, 255, 35,0.2)',
      borderColor: 'rgba(229, 255, 35,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
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
  public OpenModal: boolean = false;
  public DataShow: any;
  public Label: string;
  constructor(private http: HttpService, private Auth: AuthenticationService, private datePipe: DatePipe) {
    this.GetData_moisture();
    this.GetData_moisture_level();
    this.GetData_raining();
    this.GetData_temp();
    this.GetData_uv();
    this.GetData_wind();
    this.GetDataSoil();
    this.GetImagesSensor();
    this.User = this.Auth.User;
    this.lat = this.User.lat;
    this.lng = this.User.lng;
  }
  OnShowData(Data, name) {
    this.Label = name;
    this.OpenModal = true;
    this.DataShow = Data;
  }
  OnCloseModel() {
    this.DataShow = null;
    this.OpenModal = false;
  }
  GetData_moisture() {
    this.http.requestGet(`get/moisture/all`).subscribe((res: any) => {
      res.data.forEach(element => {
        var data = { data: [], label: '' }
        data.label = element.sensor_name;
        if (element.history_sensor.length >= this.lineChartLabelsMoisture.length)
          this.lineChartLabelsMoisture = [];
        element.history_sensor.forEach(element2 => {
          data.data.push(element2.moisture)
          this.lineChartLabelsMoisture.push(this.datePipe.transform(element2.created_dt, 'dd/MM/yyyy'));
        });
        this.lineChartDataMoisture.push(data);
      });
    });
    this.http.requestGet(`get/moisture-last`).subscribe((res: any) => {
      this.moisture = res.data;
    });
  }
  GetData_moisture_level() {
    this.http.requestGet(`get/moisture_level/all`).subscribe((res: any) => {
      res.data.forEach(element => {
        var data = { data: [], label: '' }
        data.label = element.sensor_name;
        if (element.history_sensor.length >= this.lineChartLabelsMoistureLevel.length)
          this.lineChartLabelsMoistureLevel = [];
        element.history_sensor.forEach(element2 => {
          data.data.push(element2.moisture_level)
          this.lineChartLabelsMoistureLevel.push(this.datePipe.transform(element2.created_dt, 'dd/MM/yyyy'));
        });
        this.lineChartDataMoistureLevel.push(data);
      });
    });
    this.http.requestGet(`get/moisture_level-last`).subscribe((res: any) => {
      if (res.data.moisture_level >= 500 && res.data.moisture_level <= 669) {
        this.moisture_level = 'ไม่มีฝน'
      } else if (res.data.moisture_level >= 250 && res.data.moisture_level <= 499) {
        this.moisture_level = 'น้อย'
      } else if (res.data.moisture_level >= 101 && res.data.moisture_level <= 249) {
        this.moisture_level = 'ปานกลาง'
      } else {
        this.moisture_level = 'มาก'
      }
    });
  }
  GetData_raining() {
    this.http.requestGet(`get/raining-last`).subscribe((res: any) => {
      this.raining = res.data;
    });
  }
  GetData_temp() {
    this.http.requestGet(`get/temp/all`).subscribe((res: any) => {
      res.data.forEach(element => {
        var data = { data: [], label: '' }
        data.label = element.sensor_name;
        if (element.history_sensor.length >= this.lineChartLabelsTemp.length)
          this.lineChartLabelsTemp = [];
        element.history_sensor.forEach(element2 => {
          data.data.push(element2.temp)
          this.lineChartLabelsTemp.push(this.datePipe.transform(element2.created_dt, 'dd/MM/yyyy'));
        });
        this.lineChartDataTemp.push(data);
      });
    });
    this.http.requestGet(`get/temp-last`).subscribe((res: any) => {
      this.temp = res.data;
    });
  }
  GetData_uv() {
    this.http.requestGet(`get/uv/all`).subscribe((res: any) => {
      res.data.forEach(element => {
        var data = { data: [], label: '' }
        data.label = element.sensor_name;
        if (element.history_sensor.length >= this.lineChartLabelsUv.length)
          this.lineChartLabelsUv = [];
        element.history_sensor.forEach(element2 => {
          data.data.push(element2.uv)
          this.lineChartLabelsUv.push(this.datePipe.transform(element2.created_dt, 'dd/MM/yyyy'));
        });
        this.lineChartDataUv.push(data);
      });
    });
    this.http.requestGet(`get/uv-last`).subscribe((res: any) => {
      this.uv = res.data;
    });
    
  }
  GetData_wind() {
    this.http.requestGet(`get/wind/all`).subscribe((res: any) => {
      res.data.forEach(element => {
        var data = { data: [], label: '' }
        data.label = element.sensor_name;
        if (element.history_sensor.length >= this.lineChartLabelsWind.length)
          this.lineChartLabelsWind = [];
        element.history_sensor.forEach(element2 => {
          data.data.push(element2.wind)
          this.lineChartLabelsWind.push(this.datePipe.transform(element2.created_dt, 'dd/MM/yyyy'));
        });
        this.lineChartDataWind.push(data);
      });
    });
    this.http.requestGet(`get/wind-last`).subscribe((res: any) => {
      this.wind = res.data;
    });
  }
  GetDataSoil() {
    this.http.requestGet(`get/soil/all`).subscribe((res: any) => {
      res.data.forEach(element => {
        var data = { data: [], label: '' }
        data.label = element.sensor_name;
        if (element.history_sensor.length >= this.lineChartLabelsSoil.length)
          this.lineChartLabelsSoil = [];
        element.history_sensor.forEach(element2 => {
          data.data.push(element2.soil_data)
          this.lineChartLabelsSoil.push(this.datePipe.transform(element2.create_dt, 'dd/MM/yyyy'));
        });
        this.lineChartDataSoil.push(data);
      });
    });
    this.http.requestGet(`get/soil-last`).subscribe((res: any) => {
      let data = res.data;
      if (data >= 700 && data <= 900) {
        this.soil = 'ไม่มีความชื้น'
      } else if (data >= 500 && data <= 699) {
        this.soil = 'น้อย'
      } else if (data >= 499 && data <= 300) {
        this.soil = 'ปานกลาง'
      } else {
        this.soil = 'มาก'
      }
    });
  }
  GetImagesSensor() {
    this.http.requestGet(`get/all/images/sensor`).subscribe((res: any) => {
      this.imagesSensor = res.data;
    });
  }
  GetImages(sensor_id) {
    if(!sensor_id)return;
    this.http.requestGet(`get/all/images?sensor_id=${sensor_id}`).subscribe((res: any) => {
      this.images = res.data;
      this.image = res.data[0].image;
    });
  }
  OnChangeImage(img) {
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
