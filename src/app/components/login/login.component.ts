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

  form: FormGroup;

  constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder, 
    private autenticationService: AutenticationService, private portfolioService: PortfolioService) 
  {
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

    this.autenticationService.login(this.form.value.nombreUsuario, this.form.value.contrasenia).subscribe(data => {

      this.loginStatus = data != null;
      this.emitirCambioLoginStatus();

      if (this.loginStatus) {

        this.portfolioService.getPersona().subscribe( data => {
          //paso los datos al subject de PortfolioService
          this.portfolioService.onLoginChange.next(data);

          sessionStorage.setItem("personaPortfolio", JSON.stringify(data));
          
          this.router.navigate(["/portfolio"]);
        });
        // this.router.navigate(["/portfolio"]);
        
      } else {
        console.log("usuario o contraseña incorrectos");
      }

    });
    
  }

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
