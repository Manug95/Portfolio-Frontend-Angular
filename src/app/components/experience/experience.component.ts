import { Component } from '@angular/core';
import { Experience } from 'src/app/models/Experience.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  loginStatus: boolean;
  experiences: Experience[];

  constructor(private portfolioService: PortfolioService, private loginService: LoginService) {
    this.loginStatus = this.loginService.getLoginStatus();
    this.experiences = this.portfolioService.getExperience();
  }

}
