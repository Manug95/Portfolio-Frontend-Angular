import { Component } from '@angular/core';
import { Institution } from 'src/app/models/Institution.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  institutions: Institution[];

  loginStatus: boolean;

  constructor(private portfolioService: PortfolioService, private loginService: LoginService) {
    this.institutions = this.portfolioService.getEducation();
    this.loginStatus = this.loginService.getLoginStatus();

    /**
     * recibe el login status del loginService
     */
    loginService.changeEmitted$.subscribe(cambio => {
      this.loginStatus = cambio;
      // console.log(this.loginStatus);
    });
    
  }
}
