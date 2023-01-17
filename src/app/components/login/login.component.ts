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

  loginStatus: boolean;

  email: string = "";
  password: string = "";

  // @Output() loginChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private loginService: LoginService) {
    this.loginStatus = this.loginService.getLoginStatus();
  }

  login():void {
    this.loginService.startSesionService();
    this.loginStatus = this.loginService.getLoginStatus();

    this.emitirCambioLoginStatus();//envio el loginStatus al appComponent

    this.router.navigate(["/"]);
  }

  goToPortfolio(): void {
    this.router.navigate(["/"]);
  }

  emitirCambioLoginStatus() {
    this.loginService.emitChange(this.loginStatus);
  }
}
