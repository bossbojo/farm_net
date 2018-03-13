import { GlobalValueService } from './../../services/global-value.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { jalert } from '../../configs/alert.config';

@Component({
  selector: 'app-history-sensor',
  templateUrl: './history-sensor.component.html',
  styleUrls: ['./history-sensor.component.scss']
})
export class HistorySensorComponent implements OnInit {
  startPage: number = 1;
  MaxData: number = 20;
  User: any;
  constructor(private http: HttpService, private global: GlobalValueService, private Auth: AuthenticationService) {
    this.User = this.Auth.User;
    this.GetData();
  }

  ngOnInit() {
  }
  GetData() {
    this.http.requestGet(`get/data_sensor?start=${this.startPage}&max=${this.MaxData}`)
      .subscribe((res: any) => {
        console.log(res.data);
      }, (err:any) =>{
        console.log(err);
        
        jalert('เเจ้งเตือน',err.data.Message);
      });
  }
}
