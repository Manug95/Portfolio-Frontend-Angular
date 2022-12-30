import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginStatus: boolean = false;

  constructor() { }

  getLoginStatus(): boolean {
    return this.loginStatus;
  }

  changeLoginStatus(): void {
    this.loginStatus = !this.loginStatus;
  }
}
