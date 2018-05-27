import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpService } from './../../../services/http.service';

@Component({
  selector: 'app-modal-grap',
  templateUrl: './modal-grap.component.html',
  styleUrls: ['./modal-grap.component.scss']
})
export class ModalGrapComponent implements OnChanges {

  @Input() Open: boolean;
  @Input() Data: any;
  @Input() Labels: any;
  @Output() Close = new EventEmitter()
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartData: Array<any>;
  public lineChartColors: Array<any>;
  constructor(private http: HttpService, private datePipe: DatePipe) {

  }

  ngOnChanges() {
    if (this.Open && this.Data) {
      $('#Show').modal();
      this.lineChartData = [
        { data: [], label: this.Labels },
      ];
      if (this.Data == 1) {
        this.lineChartColors = [
          { // อุณหภูมิ
            backgroundColor: 'rgba(100, 92, 214,0.2)',
            borderColor: 'rgba(100, 92, 214,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          },
        ]
        this.GetData_temp();
      }
      if (this.Data == 2) {
        this.lineChartColors = [
          { // ความชื้น
            backgroundColor: 'rgba(163, 158, 239,0.2)',
            borderColor: 'rgba(163, 158, 239,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
        ]
        this.GetData_moisture();
      }
      if (this.Data == 3) {
        this.lineChartColors = [
          { // ความเเรงลม
            backgroundColor: 'rgba(193, 116, 117,0.2)',
            borderColor: 'rgba(193, 116, 117,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
        ]
        this.GetData_wind();
      }
      if (this.Data == 4) {
        this.lineChartColors = [
          { // เเสงเเดด
            backgroundColor: 'rgba(229, 255, 35,0.2)',
            borderColor: 'rgba(229, 255, 35,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
        ]
        this.GetData_uv();
      }
      if (this.Data == 5) {
        this.lineChartColors = [

          { //  ปริมาณน้ำฝน
            backgroundColor: 'rgba(255, 191, 0,0.2)',
            borderColor: 'rgba(255, 191, 0,1)',
            pointBackgroundColor: 'rgba(255, 191, 0,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 191, 0,0.8)'
          }
        ]
        this.GetData_moisture_level();
      }
      if (this.Data == 6) {
        this.lineChartColors = [
          { // อุณหภูมิ
            backgroundColor: 'rgba(100, 92, 214,0.2)',
            borderColor: 'rgba(100, 92, 214,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          },
        ]
        this.GetDataSoil();
      }
    }
  }
  Onclose() {
    $('#Show').modal('hide');
    this.Close.emit(false);
  }
  GetData_moisture() {
    this.http.requestGet(`get/moisture`).subscribe((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.lineChartLabels.push(this.datePipe.transform(data[i].created_dt, 'dd/MM/yyyy'));
        this.lineChartData[0].data.push(data[i].moisture) //อุณหภูมิ
      }
    });
  }
  GetData_moisture_level() {
    this.http.requestGet(`get/moisture_level`).subscribe((res: any) => {
      let data = res.data;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.lineChartLabels.push(this.datePipe.transform(data[i].created_dt, 'dd/MM/yyyy'));
        this.lineChartData[0].data.push(data[i].moisture_level) //อุณหภูมิ
      }
    });
  }
  GetData_raining() {
    this.http.requestGet(`get/raining`).subscribe((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.lineChartLabels.push(this.datePipe.transform(data[i].created_dt, 'dd/MM/yyyy'));
        this.lineChartData[0].data.push(data[i].raining?1:0) //อุณหภูมิ
      }
    });
  }
  GetData_temp() {
    this.http.requestGet(`get/temp`).subscribe((res: any) => {
      let data = res.data;
      console.log(data);
      
      for (let i = 0; i < data.length; i++) {
        this.lineChartLabels.push(this.datePipe.transform(data[i].created_dt, 'dd/MM/yyyy'));
        this.lineChartData[0].data.push(data[i].temp) //อุณหภูมิ
      }
    });
  }
  GetData_uv() {
    this.http.requestGet(`get/uv`).subscribe((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.lineChartLabels.push(this.datePipe.transform(data[i].created_dt, 'dd/MM/yyyy'));
        this.lineChartData[0].data.push(data[i].uv) //อุณหภูมิ
      }
    });
  }
  GetData_wind() {
    this.http.requestGet(`get/wind`).subscribe((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.lineChartLabels.push(this.datePipe.transform(data[i].created_dt, 'dd/MM/yyyy'));
        this.lineChartData[0].data.push(data[i].wind) //อุณหภูมิ
      }
    });
  }
  GetDataSoil() {
    this.http.requestGet(`get/data/sensor/soil`).subscribe((res: any) => {
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        this.lineChartLabels.push(this.datePipe.transform(data[i].date, 'dd/MM/yyyy'));
        this.lineChartData[0].data.push(data[i].soil_data) //อุณหภูมิ
      }
    });
  }
}

