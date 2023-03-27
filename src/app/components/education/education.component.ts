import { Component } from '@angular/core';
import { Institution } from 'src/app/models/Institution.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {

  educations: any[] = [];
  educacionSeleccionada: number = -1;

  formEdit: FormGroup;

  loginStatus: boolean;

  tituloModal:string = "";

  erroresFechas: string[] = [];

  responseStatus: number = 0;

  constructor(private portfolioService: PortfolioService, private loginService: LoginService, private formBuilder: FormBuilder) {
    //this.institutions = this.portfolioService.getEducation();
    this.loginStatus = this.loginService.getLoginStatus();

    //para las pruebas, luego borrar...creo jajaja equiz de salu2
    window.addEventListener("load", (e) => {
      let carga = JSON.parse(sessionStorage.getItem("personaPortfolio") || "{}");
      if (Object.entries(carga).length > 0) {this.educations = carga.educaciones;}
    });

    //me suscribo al subject de PortdolioService
    this.portfolioService.onLoginChange.subscribe({
      next: (data) => {
        if (Object.entries(data).length > 0) {
          this.educations = data.educaciones;
        }
      }
    });

    /**
     * recibe el login status del loginService
     */
    loginService.changeEmitted$.subscribe(cambio => {
      this.loginStatus = cambio;
    });

    this.formEdit = this.formBuilder.group(
      {
        nombreInstitucion: ["", [/*Validators.required, */Validators.maxLength(45)]],
        tituloDeEstudios: ["", [/*Validators.required, */Validators.maxLength(45)]],
        logoInstitucion: [""],
        fechaInicio: ["", [/*Validators.required, */Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^(?:3[01]|[12][0-9]|0?[1-9])([\\/])(0?[1-9]|1[0-2])\\1\\d{4}$")]],
        fechaFin: ["", [Validators.maxLength(10), Validators.pattern("^(?:3[01]|[12][0-9]|0?[1-9])([\\/])(0?[1-9]|1[0-2])\\1\\d{4}$")]]
      }
    );
    
  }

  //-----------------------------------------------------------------FUNCIONES EDIT MODAL---------------------------------------------------------------------

  openEditModal(i: number) {
    let edu = this.educations[i];
    this.educacionSeleccionada = i;

    this.tituloModal = "Editar Educación";

    this.showItemById("btn-save-changes-education");
    this.hideItemById("btn-save-education");

    //seteo los values de los form control
    this.formEdit.get("nombreInstitucion")?.setValue(edu.nombreInstitucion);
    this.formEdit.get("tituloDeEstudios")?.setValue(edu.tituloDeEstudios);
    //aca va lo del logo
    this.formEdit.get("fechaInicio")?.setValue(this.formateDate(edu.fechaInicio));
    this.formEdit.get("fechaFin")?.setValue(edu.fechaFin ? this.formateDate(edu.fechaFin) : "");
  }

  saveChangesEducation() {
    this.erroresFechas = [];

    if (this.validateYear(this.formEdit.value.fechaInicio) && this.validateYear(this.formEdit.value.fechaFin)) {

      let fIni = this.createDate(this.formEdit.value.fechaInicio);
      let fFin = this.createDate(this.formEdit.value.fechaFin);
      if (fFin != null ? this.validateDates(fIni, fFin) : true) {

        const eduEdi = {
          idEducacion: this.educations[this.educacionSeleccionada].idEducacion,
          nombreInstitucion: this.formEdit.value.nombreInstitucion,
          tituloDeEstudios: this.formEdit.value.tituloDeEstudios,
          logoInstitucion: "",
          fechaInicio: this.formateDate(this.formEdit.value.fechaInicio),
          fechaFin: this.formateDate(this.formEdit.value.fechaFin)
        }

        this.portfolioService.editarEducacion(eduEdi).subscribe(resp => {
          
          this.responseStatus = resp;

          if (resp > 0) {
            eduEdi.idEducacion = resp;
            this.educations[this.educacionSeleccionada] = eduEdi;
            console.log("se actualizo el arreglo");
          }

        });

      } else {
        this.erroresFechas.push("La fecha de finalización no puede ser anterior a la fecha de inicio");
      }

    } else {
      this.erroresFechas.push("El año de una de las fechas es incorrecto! No puede ser futuro ni anterior a 1900");
    }

  }

  enableSaveChangesButton(): boolean {
    let enabled: boolean = this.notAnEmptyField("nombreInstitucion") && this.NombreInstitucion?.errors == null;
    enabled &&= this.notAnEmptyField("tituloDeEstudios") && this.TituloDeEstudios?.errors == null;
    enabled &&= this.notAnEmptyField("fechaInicio") && this.FechaInicio?.errors == null;
    enabled &&= (this.notAnEmptyField("fechaFin") && this.FechaFin?.errors == null) || !this.notAnEmptyField("fechaFin");

    return enabled;
  }

  get NombreInstitucion() {
    return this.formEdit.get("nombreInstitucion");
  }

  get TituloDeEstudios() {
    return this.formEdit.get("tituloDeEstudios");
  }

  get LogoInstitucion() {
    return this.formEdit.get("logoInstitucion");
  }

  get FechaInicio() {
    return this.formEdit.get("fechaInicio");
  }

  get FechaFin() {
    return this.formEdit.get("fechaFin");
  }

  //-----------------------------------------------------------------FUNCIONES ADD MODAL---------------------------------------------------------------------

  openAddModal() {
    this.tituloModal = "Agregar Educación";

    this.formEdit.get("nombreInstitucion")?.setValue("");
    this.formEdit.get("tituloDeEstudios")?.setValue("");
    //aca va lo del logo
    this.formEdit.get("fechaInicio")?.setValue("");
    this.formEdit.get("fechaFin")?.setValue("");

    this.showItemById("btn-save-education");
    this.hideItemById("btn-save-changes-education");
  }

  saveEducation() {

    this.erroresFechas = [];

    if (this.validateYear(this.formEdit.value.fechaInicio) && this.validateYear(this.formEdit.value.fechaFin)) {

      let fIni = this.createDate(this.formEdit.value.fechaInicio);
      let fFin = this.createDate(this.formEdit.value.fechaFin);
      if (fFin != null ? this.validateDates(fIni, fFin) : true) {

        const newEdu = {
          nombreInstitucion: this.formEdit.value.nombreInstitucion,
          tituloDeEstudios: this.formEdit.value.tituloDeEstudios,
          logoInstitucion: "",
          fechaInicio: this.formateDate(this.formEdit.value.fechaInicio),
          fechaFin: this.formateDate(this.formEdit.value.fechaFin)
        }

        this.portfolioService.agregarEducacion(newEdu).subscribe(resp => {
          console.log("respuesta: "+resp);

          if (resp != null) {
            this.educations.push({
              idEducacion: resp,
              ...newEdu
            });

            this.responseStatus = 1;
            console.log("se actualizo el arreglo");
          } else {
            this.responseStatus = -1;
          }

        });

      } else {
        this.erroresFechas.push("La fecha de finalización no puede ser anterior a la fecha de inicio");
      }

    } else {
      this.erroresFechas.push("El año de una de las fechas es incorrecto! No puede ser futuro ni anterior a 1900");
    }

  }

  enableSaveEducationButton(): boolean {
    let enabled: boolean = this.notAnEmptyField("nombreInstitucion") && this.NombreInstitucion?.errors == null;
    enabled &&= this.notAnEmptyField("tituloDeEstudios") && this.TituloDeEstudios?.errors == null;
    enabled &&= this.notAnEmptyField("fechaInicio") && this.FechaInicio?.errors == null;
    enabled &&= (this.notAnEmptyField("fechaFin") && this.FechaFin?.errors == null) || !this.notAnEmptyField("fechaFin");

    return enabled;
  }

  //-----------------------------------------------------------------FUNCIONES PARA AMBOS MODALS---------------------------------------------------------------------

  closeModal() {
    this.responseStatus = 0;
  }

  validateDates(fechaIni: Date, fechaFin: Date) {

    return fechaIni.valueOf() < fechaFin.valueOf()

  }

  validateYear(date: string) {
    if (date.length > 0) {
      const year = date.split("/")[2];
      return +year > 1900 && +year <= new Date().getFullYear();
    } else {
      return true;
    }
  }

  createDate(date: string): any {
    if (date.length > 0) {
      let separator: string = "";

      if (date.includes("/")) {
        separator = "/";
      }
      if (date.includes("-")) {
        separator = "-";
      }

      return new Date(+date.split(separator)[2], +date.split(separator)[1], +date.split(separator)[0]);
    } else {
      return null;
    }
  }

  formateDate(date: string) {
    let splitDate;

    let formatedDate;

    if (date.includes("-")) {
      splitDate = date.split("-");
      formatedDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0]; 
    } else if (date.includes("/")) {
      splitDate = date.split("/");
      formatedDate = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0]; 
    }

    return formatedDate;
  }

  notAnEmptyField(field: string): boolean {
    return this.formEdit.get(field)?.value.length > 0 && this.formEdit.get(field)?.value.trim().length > 0;
  }

  private showItemById(id: string) {
    document.getElementById(id)?.classList.remove("hide-item");
    document.getElementById(id)?.classList.add("show-item");
  }

  private hideItemById(id: string) {
    document.getElementById(id)?.classList.remove("show-item");
    document.getElementById(id)?.classList.add("hide-item");
  }

  //-----------------------------------------------------------------FUNCIONES PARA DELETE MODAL---------------------------------------------------------------------

  deleteEducation() {
    const idEdu = this.educations[this.educacionSeleccionada].idEducacion;

    this.portfolioService.eliminarEducacion(idEdu).subscribe(resp => {

      this.responseStatus = resp;

      if (this.responseStatus > 0) {
        this.educations = this.educations.filter(x => x.idEducacion != idEdu);

      }

    });
  }

  openDeleteModal(i: number) {
    this.responseStatus = 0;
    this.educacionSeleccionada = i;
  }

}
