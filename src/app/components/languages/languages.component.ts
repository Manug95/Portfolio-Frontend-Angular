import { Component } from '@angular/core';
import { Language } from 'src/app/models/Language.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent {

  loginStatus: boolean;
  languages: any[] = [];

  formLanguages: FormGroup;

  tituloModal:string = "";
  responseStatusIdioma: number = 0;
  idiomaSeleccionado: number = -1;

  constructor(private portfolioService: PortfolioService, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.loginStatus = this.loginService.getLoginStatus();
    // this.languages = this.portfolioService.getLanguages();

    /**
     * recibe el login status del loginService
     */
    loginService.changeEmitted$.subscribe(cambio => {
      this.loginStatus = cambio;
      // console.log(this.loginStatus);
    });

    //me suscribo al subject de PortdolioService
    this.portfolioService.onLoginChange.subscribe({
      next: (data) => {
        if (Object.entries(data).length > 0) {
          this.languages = data.habilidades.filter((h: { tipoHabilidad: string; }) => h.tipoHabilidad.toLowerCase() == "language");
        }
      }
    });

    this.formLanguages = this.formBuilder.group(
      {
        nombreHabilidad: ["", [Validators.maxLength(45)]],
        tipoHabilidad: ["", [Validators.maxLength(45)]],
        progreso: ["", [Validators.required, Validators.max(100), Validators.min(0)]]
      }
    );
    
  }

  //----------------------------------------------------------------------FUNCIONES AÑADIR-----------------------------------------------------------------

  openAddLanguageModal() {
    this.tituloModal = "Agregar Idioma";

    this.formLanguages.get("nombreHabilidad")?.setValue("");
    // this.formLanguages.get("tipoHabilidad")?.setValue("");
    this.formLanguages.get("progreso")?.setValue(0);

    this.showItemById("btn-save-lang");
    this.hideItemById("btn-save-changes-lang");
  }

  saveLanguage() {

    const newLang = {
      nombreHabilidad: this.formLanguages.value.nombreHabilidad,
      tipoHabilidad: "Language",//this.formLanguages.value.tipoHabilidad,
      progreso: this.formLanguages.value.progreso
    }
    console.log(newLang);

    this.portfolioService.agregarHabilidad(newLang).subscribe(resp => {
      console.log("respuesta: "+resp);

      if (resp != null) {
        if (resp > 0) {
          this.languages.push({
            idHabilidad: resp,
            ...newLang
          });

          this.responseStatusIdioma = 1;
          console.log("se actualizo el arreglo");
        } else {
          this.responseStatusIdioma = -1;
        }
      } else {
        this.responseStatusIdioma = -1;
      }

    });

  }

  //---------------------------------------------------------------------FUNCIONES EDITAR------------------------------------------------------------------

  openEditLanguageModal(i: number) {
    let language = this.languages[i];
    this.idiomaSeleccionado = i;

    this.tituloModal = "Editar Idioma";

    this.showItemById("btn-save-changes-lang");
    this.hideItemById("btn-save-lang");

    //seteo los values de los form control
    this.formLanguages.get("nombreHabilidad")?.setValue(language.nombreHabilidad);
    // this.formLanguages.get("tipoHabilidad")?.setValue(language.tipoHabilidad);
    this.formLanguages.get("progreso")?.setValue(language.progreso);
  }

  saveChangesLanguage() {

    const langEdi = {
      idHabilidad: this.languages[this.idiomaSeleccionado].idHabilidad,
      nombreHabilidad: this.formLanguages.value.nombreHabilidad,
      tipoHabilidad: "Language",//this.formLanguages.value.tipoHabilidad,
      progreso: this.formLanguages.value.progreso
    }
    console.log(langEdi);

    this.portfolioService.editarHabilidad(langEdi).subscribe(resp => {
      
      this.responseStatusIdioma = resp;

      if (resp > 0) {
        this.languages[this.idiomaSeleccionado] = langEdi;
        console.log("se actualizo el arreglo");
      }

    });

  }

  //----------------------------------------------------------------------FUNCIONES PARA DELETE-----------------------------------------------------------------

  deleteLanguage() {
    const language = this.languages[this.idiomaSeleccionado];
    const idLang = language.idHabilidad;
    console.log(language);

    this.portfolioService.eliminarHabilidad(idLang).subscribe(resp => {

      this.responseStatusIdioma = resp;

      if (this.responseStatusIdioma > 0) {
        this.languages = this.languages.filter(x => x.idHabilidad != idLang);
      }

    });
  }

  openDeleteLanguageModal(i: number) {
    this.responseStatusIdioma = 0;
    this.idiomaSeleccionado = i;
    
  }

  //----------------------------------------------------------------------FUNCIONES PARA TODO-----------------------------------------------------------------

  closeModal() {
    this.responseStatusIdioma = 0;
  }

  notAnEmptyField(field: string): boolean {
    return this.formLanguages.get(field)?.value.length > 0 && this.formLanguages.get(field)?.value.trim().length > 0;
  }

  enableSaveLanguageChangesButton(): boolean {
    let enabled: boolean = this.notAnEmptyField("nombreHabilidad") && this.NombreIdioma?.errors == null;
    //enabled &&= this.notAnEmptyField("tipoHabilidad") && this.TipoHabilidad?.errors == null;
    enabled &&= this.ProgresoIdioma?.errors == null;

    return enabled;
  }

  private showItemById(id: string) {
    const obj = document.getElementById(id);
    
    obj?.classList.remove("hide-item");
    obj?.classList.add("show-item");
  }

  private hideItemById(id: string) {
    const obj = document.getElementById(id);

    obj?.classList.remove("show-item");
    obj?.classList.add("hide-item");
  }

  // esPar(n: number): boolean {
  //   return (n % 2) == 0;
  // }

  // esLaUltimaHabilidad(indice: number) {
  //   return indice == this.skills.length-1 && this.esPar(indice);
  // }

  //---------------------------------------------------------------------------------------------------------------------------------------

  get NombreIdioma() {
    return this.formLanguages.get("nombreHabilidad");
  }

  get TipoHabilidad() {
    return this.formLanguages.get("tipoHabilidad");
  }

  get ProgresoIdioma() {
    return this.formLanguages.get("progreso");
  }

}
