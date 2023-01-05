import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  loginStatus: boolean;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginStatus = this.loginService.getLoginStatus();
  }

  openLogin():void {
    this.router.navigate(["/login"]);
    // this.loginService.paraElLogout().then(value => console.log(value));
  }

  closeSesion():void {
    // console.log(this.loginStatus);
    this.loginService.closeSesionService();
    window.location.reload();
  }
}
