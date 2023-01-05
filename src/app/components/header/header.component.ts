import { Component } from '@angular/core';
import { Location } from 'src/app/models/Location.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // loginStatus: boolean;
  // fullName: string;
  // dob: Date;
  // email: string;
  // location: Location;

  // constructor(private loginService: LoginService, private portfolioService: PortfolioService) {
  //   this.loginStatus = this.loginService.getLoginStatus();
    
  //   this.fullName = this.portfolioService.getName() + " " + this.portfolioService.getLastName();
  //   this.dob =  this.portfolioService.getDob();
  //   this.email = this.portfolioService.getEmail();
  //   this.location = this.portfolioService.getLocation();
  // }

}
