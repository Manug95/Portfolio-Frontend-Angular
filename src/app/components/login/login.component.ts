import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { AutenticationService } from 'src/app/services/autentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginStatus: boolean;

  // user: string = "";
  // password: string = "";

  form: FormGroup;

  // @Output() loginChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder, private autenticationService: AutenticationService) {
    this.loginStatus = this.loginService.getLoginStatus();

    this.form = this.formBuilder.group(
      {
        nombreUsuario: ["", [Validators.required]],
        contrasenia: ["", [Validators.required, Validators.minLength(8)]]
      }
    );

  }

  login(event: Event) {
    event.preventDefault;
//console.log(this.form.value.nombreUsuario);
    this.autenticationService.login(this.form.value.nombreUsuario, this.form.value.contrasenia).subscribe(data => {
      //console.log("DATA: " + JSON.stringify(data));

      this.loginStatus = data != null;
      this.emitirCambioLoginStatus();

      if (this.loginStatus) {
        this.router.navigate(["/"]);
      } else {
        console.log("usuario o contraseña incorrectos");
      }

    });
    // this.loginStatus = sessionStorage.getItem("currentUser")!= null;
    // this.emitirCambioLoginStatus();
  }

  // login1():void {
  //   this.loginService.startSesionService();
  //   this.loginStatus = this.loginService.getLoginStatus();

  //   this.emitirCambioLoginStatus();//envio el loginStatus al appComponent

  //   this.router.navigate(["/"]);
  // }

  goToPortfolio(): void {
    this.router.navigate(["/"]);
  }

  emitirCambioLoginStatus() {
    this.loginService.emitChange(this.loginStatus);
  }

  get NombreUsuario() {
    return this.form.get("nombreUsuario");
  }

  get Contrasenia() {
    return this.form.get("contrasenia");
  }

}
