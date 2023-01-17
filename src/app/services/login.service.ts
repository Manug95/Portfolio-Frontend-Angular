import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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


  
  /*
  lo de aca abajo es para mandar el loginStatus al appComponent
  */
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }
}
