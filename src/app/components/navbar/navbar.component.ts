import { UrlConfig } from './../../configs/url.config';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { jconfirm } from '../../configs/alert.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  Url = UrlConfig;
  User: any;
  constructor(public Auth: AuthenticationService) {
    console.log(Auth.getUser);
    this.User = Auth.getUser;
  }

  ngOnInit() {
  }
  Onlogout() {
    jconfirm('เเจ้งเตือน', 'คุตอนการออกจากระบบ?').then((res) => {
      if (!res) return;
      this.Auth.logout();
    });
  }
}
