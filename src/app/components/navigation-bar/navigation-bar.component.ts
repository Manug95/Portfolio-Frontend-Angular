import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  //@Input() loginStatusPadre: boolean = false;
  loginStatus: boolean;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginStatus = this.loginService.getLoginStatus();

    loginService.changeEmitted$.subscribe(cambio => {
      this.loginStatus = cambio;
    });

  }

  openLogin():void {
    this.router.navigate(["/login"]);
  }

  closeSesion():void {
    this.loginStatus = false;
    this.loginService.closeSesionService();
    this.emitirCambioLoginStatus();
    this.router.navigate(["/login"]);
  }

  emitirCambioLoginStatus() {
    this.loginService.emitChange(this.loginStatus);
  }
}
