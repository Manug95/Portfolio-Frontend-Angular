import { HttpResponse } from '@angular/common/http';
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
  edicionExitosa: boolean = false;

  sobreMiProperty: string = "";//"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur, nunc at mattis faucibus, mi sem volutpat ipsum, vitae posuere massa dui ut massa. Ut hendrerit quis erat eget dignissim. Aenean venenatis, risus vitae egestas gravida, risus risus dapibus risus, in molestie augue metusnon leo.";

  constructor(private loginService: LoginService, private portfolioService: PortfolioService) {
    this.loginStatus = this.loginService.getLoginStatus();

    //me suscribo al subject de PortdolioService
    this.portfolioService.onLoginChange.subscribe({
      next: (data) => {this.sobreMiProperty = data.sobreMi}
    });

    /**
     * recibe el login status del loginService
     */
    loginService.changeEmitted$.subscribe(cambio => {
      this.loginStatus = cambio;
    });
    
  }

  ngOnInit(): void {
  }

  saveChangesModalEdit(sobreMiEditado: string) {
    
    if (this.validate(sobreMiEditado).length == 0) {

      this.portfolioService.editarSobreMi(sobreMiEditado).subscribe((resp: HttpResponse<any>) => {
        if (resp.body != null) {
          this.edicionExitosa = true;
          this.sobreMiProperty = sobreMiEditado;
          let persona = JSON.parse( sessionStorage.getItem("personaPortfolio") || "{}" );
          persona.sobreMi = this.sobreMiProperty;
        } else {
          this.edicionExitosa = false;
        }

      });
      
    }
    
  }

  validate(texto: string): string[] {
    let errores: string[] = [];

    if (texto.length == 0 || texto.trim().length == 0) {
      errores.push("El campo no puede estar vacío");
    }
    if (texto.length > 1500) {
      errores.push("El texto no puede tener mas de 1500 caracteres");
    }

    return errores;
  }

  limpiarMensaje() {
    this.edicionExitosa = false;
  }

}
