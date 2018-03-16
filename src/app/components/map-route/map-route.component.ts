import { UrlConfig } from './../../configs/url.config';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit,OnChanges } from '@angular/core';
import { GlobalValueService } from '../../services/global-value.service';

@Component({
  selector: 'app-map-route',
  templateUrl: './map-route.component.html',
  styleUrls: ['./map-route.component.scss']
})
export class MapRouteComponent {
  Url = UrlConfig;
  NaneRote = {
    "dahboard":"กราฟสรุปผล",
    "history-sensor":"ประวัติเซ็นเซอร์",
    "profile":"โปรฟล์",
    "change-password":"เปลี่ยนรหัสผ่าน",
    "setting":"ตั้งค่าเซ็นเซอร์"
  }
  constructor(public Auth:AuthenticationService,public Global:GlobalValueService) {
    
  }
  

}
