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

  startSesionService(): void {
    this.loginStatus = true;
  }

  closeSesionService(): void {
    this.loginStatus = false;
  }

  // paraElLogout(): Promise<boolean> {
  //   return new Promise(this.loginStatus);
  // }
}
