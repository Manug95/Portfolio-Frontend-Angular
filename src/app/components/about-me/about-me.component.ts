import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  loginStatus: boolean;

  constructor(private loginService: LoginService) {
    this.loginStatus = this.loginService.getLoginStatus();

    /**
     * recibe el login status del loginService
     */
    loginService.changeEmitted$.subscribe(cambio => {
      this.loginStatus = cambio;
      // console.log(this.loginStatus);
    });
    
  }

  ngOnInit(): void {
    
  }

  // prueba(): void {
  //   console.log(this.loginStatus);
  // }

}
