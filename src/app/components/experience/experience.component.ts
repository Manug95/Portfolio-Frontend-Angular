import { Component } from '@angular/core';
import { Experience } from 'src/app/models/Experience.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {

  loginStatus: boolean;
  experiences: any[] = [];

  formExperiences: FormGroup;

  tituloModal:string = "";
  erroresFechas: string[] = [];
  responseStatus: number = 0;
  experienciaSeleccionada: number = -1;

  constructor(private portfolioService: PortfolioService, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.loginStatus = this.loginService.getLoginStatus();
    //this.experiences = this.portfolioService.getExperience();

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
          this.experiences = data.experiencias;
        }
      }
    });

    this.formExperiences = this.formBuilder.group(
      {
        nombreExperiencia: ["", [Validators.maxLength(45)]],
        descripcion: ["", [Validators.maxLength(255)]],
        fechaInicio: ["", [Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^(?:3[01]|[12][0-9]|0?[1-9])([\\/])(0?[1-9]|1[0-2])\\1\\d{4}$")]],
        fechaFin: ["", [Validators.maxLength(10), Validators.pattern("^(?:3[01]|[12][0-9]|0?[1-9])([\\/])(0?[1-9]|1[0-2])\\1\\d{4}$")]],
        imgLogo: [""],
        tipoExperiencia: ["", [Validators.maxLength(45)]]
      }
    );
    
  }

  //---------------------------------------------------------------------FUNCIONES EDITAR------------------------------------------------------------------

  openEditExperienceModal(i: number) {
    let exp = this.experiences[i];
    this.experienciaSeleccionada = i;

    this.tituloModal = "Editar Experiencia";

    this.showItemById("btn-save-changes-experience");
    this.hideItemById("btn-save-experience");

    //seteo los values de los form control
    this.formExperiences.get("nombreExperiencia")?.setValue(exp.nombreExperiencia);
    this.formExperiences.get("descripcion")?.setValue(exp.descripcion);
    this.formExperiences.get("fechaInicio")?.setValue(this.formateDate(exp.fechaInicio));
    this.formExperiences.get("fechaFin")?.setValue(exp.fechaFin ? this.formateDate(exp.fechaFin) : "");
    //aca va lo del logo
    this.formExperiences.get("tipoExperiencia")?.setValue(exp.tipoExperiencia);
  }

  saveChangesExperience() {
    this.erroresFechas = [];

    if (this.validateYear(this.formExperiences.value.fechaInicio) && this.validateYear(this.formExperiences.value.fechaFin)) {

      let fIni = this.createDate(this.formExperiences.value.fechaInicio);
      let fFin = this.createDate(this.formExperiences.value.fechaFin);
      if (fFin != null ? this.validateDates(fIni, fFin) : true) {

        const expEdi = {
          idExperiencia: this.experiences[this.experienciaSeleccionada].idExperiencia,
          idPersona: this.portfolioService.getIdPersona(),
          nombreExperiencia: this.formExperiences.value.nombreExperiencia,
          descripcion: this.formExperiences.value.descripcion,
          fechaInicio: this.formateDate(this.formExperiences.value.fechaInicio),
          fechaFin: this.formateDate(this.formExperiences.value.fechaFin),
          imgLogo: "",
          tipoExperiencia: this.formExperiences.value.tipoExperiencia
        }
        console.log(expEdi);

        this.portfolioService.editarExperiencia(expEdi).subscribe(resp => {
          
          this.responseStatus = resp;

          if (resp > 0) {
            this.experiences[this.experienciaSeleccionada] = expEdi;
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

  //----------------------------------------------------------------------FUNCIONES AÑADIR-----------------------------------------------------------------

  openAddExperienceModal() {
    this.tituloModal = "Agregar Experiencia";

    this.formExperiences.get("nombreExperiencia")?.setValue("");
    this.formExperiences.get("descripcion")?.setValue("");
    this.formExperiences.get("fechaInicio")?.setValue("");
    this.formExperiences.get("fechaFin")?.setValue("");
    //aca va lo del logo
    this.formExperiences.get("tipoExperiencia")?.setValue("");

    this.showItemById("btn-save-experience");
    this.hideItemById("btn-save-changes-experience");
  }

  // enableSaveExperienceButton(): boolean {
  //   let enabled: boolean = this.notAnEmptyField("nombreExperiencia") && this.NombreExperiencia?.errors == null;
  //   enabled &&= this.notAnEmptyField("descripcion") && this.Descripcion?.errors == null;
  //   enabled &&= this.notAnEmptyField("fechaInicio") && this.FechaInicio?.errors == null;
  //   enabled &&= (this.notAnEmptyField("fechaFin") && this.FechaFin?.errors == null) || !this.notAnEmptyField("fechaFin");
  //   enabled &&= this.notAnEmptyField("tipoExperiencia") && this.TipoExperiencia?.errors == null;

  //   return enabled;
  // }

  saveExperience() {

    this.erroresFechas = [];

    if (this.validateYear(this.formExperiences.value.fechaInicio) && this.validateYear(this.formExperiences.value.fechaFin)) {

      let fIni = this.createDate(this.formExperiences.value.fechaInicio);
      let fFin = this.createDate(this.formExperiences.value.fechaFin);
      if (fFin != null ? this.validateDates(fIni, fFin) : true) {

        const newExp = {
          idPersona: this.portfolioService.getIdPersona(),
          nombreExperiencia: this.formExperiences.value.nombreExperiencia,
          descripcion: this.formExperiences.value.descripcion,
          fechaInicio: this.formateDate(this.formExperiences.value.fechaInicio),
          fechaFin: this.formateDate(this.formExperiences.value.fechaFin),
          imgLogo: "",
          tipoExperiencia: this.formExperiences.value.tipoExperiencia
        }
        console.log(newExp);

        this.portfolioService.agregarExperiencia(newExp).subscribe(resp => {
          console.log("respuesta: "+resp);

          if (resp != null) {
            if (resp > 0) {
              this.experiences.push({
                idExperiencia: resp,
                ...newExp
              });
  
              this.responseStatus = 1;
              console.log("se actualizo el arreglo");
            } else {
              this.responseStatus = -1;
            }
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

  //----------------------------------------------------------------------FUNCIONES PARA TODO-----------------------------------------------------------------

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
    return this.formExperiences.get(field)?.value.length > 0 && this.formExperiences.get(field)?.value.trim().length > 0;
  }

  enableSaveExperienceChangesButton(): boolean {
    let enabled: boolean = this.notAnEmptyField("nombreExperiencia") && this.NombreExperiencia?.errors == null;
    enabled &&= this.notAnEmptyField("descripcion") && this.Descripcion?.errors == null;
    enabled &&= this.notAnEmptyField("fechaInicio") && this.FechaInicio?.errors == null;
    enabled &&= (this.notAnEmptyField("fechaFin") && this.FechaFin?.errors == null) || !this.notAnEmptyField("fechaFin");
    enabled &&= this.notAnEmptyField("tipoExperiencia") && this.TipoExperiencia?.errors == null;

    return enabled;
  }

  showItemById(id: string) {
    document.getElementById(id)?.classList.remove("hide-item");
    document.getElementById(id)?.classList.add("show-item");
  }

  hideItemById(id: string) {
    document.getElementById(id)?.classList.remove("show-item");
    document.getElementById(id)?.classList.add("hide-item");
  }

  //----------------------------------------------------------------------FUNCIONES PARA DELETE-----------------------------------------------------------------

  deleteExperience() {
    const exp = this.experiences[this.experienciaSeleccionada];
    const idExp = exp.idExperiencia;

    this.portfolioService.eliminarExperiencia(idExp).subscribe(resp => {

      this.responseStatus = resp;

      if (this.responseStatus > 0) {
        this.experiences = this.experiences.filter(x => x.idExperiencia != idExp);
      } else {
        // this.showItemById("delete-exp-error");
      }

    });
  }

  openDeleteExperienceModal(i: number) {
    this.responseStatus = 0;
    this.experienciaSeleccionada = i;
    
  }

  //---------------------------------------------------------------------------------------------------------------------------------------

  get NombreExperiencia() {
    return this.formExperiences.get("nombreExperiencia");
  }

  get Descripcion() {
    return this.formExperiences.get("descripcion");
  }

  get FechaInicio() {
    return this.formExperiences.get("fechaInicio");
  }

  get FechaFin() {
    return this.formExperiences.get("fechaFin");
  }

  get ImgLogo() {
    return this.formExperiences.get("imgLogo");
  }

  get TipoExperiencia() {
    return this.formExperiences.get("tipoExperiencia");
  }

}
