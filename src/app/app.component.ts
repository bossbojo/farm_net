import { GlobalValueService } from './services/global-value.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(public Auth:AuthenticationService,private route:Router,private GlobalValueService:GlobalValueService){
  }
  onGetComponent(e) {
    this.GlobalValueService.RouterNow = this.route.url.split('/');
  }
}