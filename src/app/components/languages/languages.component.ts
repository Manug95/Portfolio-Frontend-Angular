import { Component } from '@angular/core';
import { Language } from 'src/app/models/Language.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent {

  loginStatus: boolean;
  languages: Language[];

  constructor(private portfolioService: PortfolioService, private loginService: LoginService) {
    this.loginStatus = this.loginService.getLoginStatus();
    this.languages = this.portfolioService.getLanguages();
  }

}
