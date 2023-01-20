import { Component, OnInit } from '@angular/core';
import { Adress } from 'src/app/models/Adress.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  loginStatus: boolean;
  fullName: string;
  dob: Date;
  email: string;
  adress: Adress;

  constructor(private loginService: LoginService, private portfolioService: PortfolioService) {
    this.loginStatus = this.loginService.getLoginStatus();
    
    this.fullName = this.portfolioService.getName() + " " + this.portfolioService.getLastName();
    this.dob =  this.portfolioService.getDob();
    this.email = this.portfolioService.getEmail();
    this.adress = this.portfolioService.getAdress();
  }

  ngOnInit(): void {
    
  }

  calculateAge(): number {
    const date: Date = new Date();
    let age: number = date.getFullYear() - this.dob.getFullYear();

    if(date.getMonth() < this.dob.getMonth()) {
      age--;
    } else if (date.getMonth() == this.dob.getMonth()) {
      if(date.getDate() < this.dob.getDate()) {
        age--;
      }
    }

    return age;
  }

}
