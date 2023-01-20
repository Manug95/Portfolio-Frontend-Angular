import { Component } from '@angular/core';
import { Adress } from 'src/app/models/Adress.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loginStatus: boolean;

   constructor(private loginService: LoginService, private portfolioService: PortfolioService) {
    this.loginStatus = this.loginService.getLoginStatus();
    // console.log(this.loginStatus);
    // setTimeout(() => console.log(this.loginStatus), 10000);
  }

}
