import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  // loginStatus: boolean;

  @Input() loginStatusPadre: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {
    // this.loginStatus = this.loginService.getLoginStatus();
    // console.log(this.loginPadre);
  }

  openLogin():void {
    this.router.navigate(["/login"]);
    // setTimeout(() => console.log(this.loginPadre), 5000);
  }

  closeSesion():void {
    // console.log(this.loginStatus);
    //this.loginService.closeSesionService();
    this.loginStatusPadre = !this.loginStatusPadre;//this.loginService.getLoginStatus();
    this.loginService.closeSesionService();
    this.emitirCambioLoginStatus();
    this.router.navigate(["/login"]);
  }

  emitirCambioLoginStatus() {
    this.loginService.emitChange(this.loginStatusPadre);
  }
}
