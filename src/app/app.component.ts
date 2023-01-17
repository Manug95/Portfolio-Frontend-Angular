import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portfolio-Frontend';

  loginStatus: boolean = false;

  constructor(private loginService: LoginService) {
    this.loginStatus = this.loginService.getLoginStatus();

    // console.log(this.loginStatus);

    /**
     * recibe el login status del loginComponent
     */
    loginService.changeEmitted$.subscribe(cambio => {
      this.loginStatus = cambio;
      // console.log(this.loginStatus);
    });
  }
}
