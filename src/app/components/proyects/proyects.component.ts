import { Component } from '@angular/core';
import { Proyect } from 'src/app/models/Proyect.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent {

  loginStatus: boolean;
  proyects: Proyect[];

  constructor(private portfolioService: PortfolioService, private loginService: LoginService) {
    this.loginStatus = this.loginService.getLoginStatus();
    this.proyects = this.portfolioService.getProyects();

    /**
     * recibe el login status del loginService
     */
    loginService.changeEmitted$.subscribe(cambio => {
      this.loginStatus = cambio;
      // console.log(this.loginStatus);
    });
    
  }

}
