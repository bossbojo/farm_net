import { Component, OnInit } from '@angular/core';
declare const angular;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  // lineChart
  public lineChartData: Array<any> = [
    { data: [2, 19, 32, 23, 11, 43, 33], label: 'อุณหภูมิดิน' },
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'อุณหภูมิ' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'ความชื้น' },
    { data: [18, 48, 77, 9, 120, 27, 40], label: 'ความเเรงลม' },
    { data: [1, 3, 43, 5, 12, 54, 3], label: 'เเสงเเดด' }
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
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

  public randomize(): void {
    let _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
