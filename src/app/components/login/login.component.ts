import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  // @Output() loginChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private loginService: LoginService) {}

  login():void {
    this.loginService.changeLoginStatus();
    this.router.navigate(["/"]);
  }

  goToPortfolio(): void {
    this.router.navigate(["/"]);
  }
}
