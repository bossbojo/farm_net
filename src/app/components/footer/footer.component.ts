import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  User:any;
  constructor(public Auth:AuthenticationService) {
    this.User = Auth.User;
   }

  ngOnInit() {
  }

}
