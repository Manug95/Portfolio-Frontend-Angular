import { Component } from '@angular/core';
import { Proyect } from 'src/app/models/Proyect.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent {

  loginStatus: boolean;
  proyects: any[] = [];

  formProyects: FormGroup;

  tituloModal:string = "";
  erroresFechas: string[] = [];
  responseStatusProyecto: number = 0;
  proyectoSeleccionado: number = -1;

  constructor(private portfolioService: PortfolioService, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.loginStatus = this.loginService.getLoginStatus();
    // this.proyects = this.portfolioService.getProyects();

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
          this.proyects = data.proyectos;
        }
      }
    });

    this.formProyects = this.formBuilder.group(
      {
        nombreProyecto: ["", [Validators.maxLength(45)]],
        descripcion: ["", [Validators.maxLength(255)]],
        urlRepositorio: ["", [Validators.maxLength(255)]],
        fechaInicio: ["", [Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^(?:3[01]|[12][0-9]|0?[1-9])([\\/])(0?[1-9]|1[0-2])\\1\\d{4}$")]],
        fechaFin: ["", [Validators.maxLength(10), Validators.pattern("^(?:3[01]|[12][0-9]|0?[1-9])([\\/])(0?[1-9]|1[0-2])\\1\\d{4}$")]]
      }
    );
    
  }

  //----------------------------------------------------------------------FUNCIONES AÑADIR-----------------------------------------------------------------

  openAddProyectModal() {
    this.tituloModal = "Agregar Proyecto";

    this.formProyects.get("nombreProyecto")?.setValue("");
    this.formProyects.get("descripcion")?.setValue("");
    this.formProyects.get("urlRepositorio")?.setValue("");
    this.formProyects.get("fechaInicio")?.setValue("");
    this.formProyects.get("fechaFin")?.setValue("");

    this.showItemById("btn-save-proyect");
    this.hideItemById("btn-save-changes-proyect");
  }

  saveProyect() {

    this.erroresFechas = [];

    if (this.validateYear(this.formProyects.value.fechaInicio) && this.validateYear(this.formProyects.value.fechaFin)) {

      let fIni = this.createDate(this.formProyects.value.fechaInicio);
      let fFin = this.createDate(this.formProyects.value.fechaFin);
      if (fFin != null ? this.validateDates(fIni, fFin) : true) {

        const newProy = {
          // idPersona: this.portfolioService.getIdPersona(),
          nombreProyecto: this.formProyects.value.nombreProyecto,
          descripcion: this.formProyects.value.descripcion,
          urlRepositorio: this.formProyects.value.urlRepositorio,
          fechaInicio: this.formateDate(this.formProyects.value.fechaInicio),
          fechaFin: this.formateDate(this.formProyects.value.fechaFin)
        }
        console.log(newProy);

        this.portfolioService.agregarProyecto(newProy).subscribe(resp => {
          console.log("respuesta: "+resp);

          if (resp != null) {
            if (resp > 0) {
              this.proyects.push({
                idProyecto: resp,
                ...newProy
              });
  
              this.responseStatusProyecto = 1;
              console.log("se actualizo el arreglo");
            } else {
              this.responseStatusProyecto = -1;
            }
          } else {
            this.responseStatusProyecto = -1;
          }

        });

      } else {
        this.erroresFechas.push("La fecha de finalización no puede ser anterior a la fecha de inicio");
      }

    } else {
      this.erroresFechas.push("El año de una de las fechas es incorrecto! No puede ser futuro ni anterior a 1900");
    }

  }

  //---------------------------------------------------------------------FUNCIONES EDITAR------------------------------------------------------------------

  openEditProyectModal(i: number) {
    let proy = this.proyects[i];
    this.proyectoSeleccionado = i;

    this.tituloModal = "Editar Proyecto";

    this.showItemById("btn-save-changes-proyect");
    this.hideItemById("btn-save-proyect");

    //seteo los values de los form control
    this.formProyects.get("nombreProyecto")?.setValue(proy.nombreProyecto);
    this.formProyects.get("descripcion")?.setValue(proy.descripcion);
    this.formProyects.get("fechaInicio")?.setValue(this.formateDate(proy.fechaInicio));
    this.formProyects.get("fechaFin")?.setValue(proy.fechaFin ? this.formateDate(proy.fechaFin) : "");
    this.formProyects.get("urlRepositorio")?.setValue(proy.urlRepositorio);
  }

  saveChangesProyect() {
    this.erroresFechas = [];

    if (this.validateYear(this.formProyects.value.fechaInicio) && this.validateYear(this.formProyects.value.fechaFin)) {

      let fIni = this.createDate(this.formProyects.value.fechaInicio);
      let fFin = this.createDate(this.formProyects.value.fechaFin);
      if (fFin != null ? this.validateDates(fIni, fFin) : true) {

        const proyEdi = {
          idProyecto: this.proyects[this.proyectoSeleccionado].idProyecto,
          // idPersona: this.portfolioService.getIdPersona(),
          nombreProyecto: this.formProyects.value.nombreProyecto,
          descripcion: this.formProyects.value.descripcion,
          fechaInicio: this.formateDate(this.formProyects.value.fechaInicio),
          fechaFin: this.formateDate(this.formProyects.value.fechaFin),
          urlRepositorio: this.formProyects.value.urlRepositorio
        }
        console.log(proyEdi);

        this.portfolioService.editarProyecto(proyEdi).subscribe(resp => {
          
          this.responseStatusProyecto = resp;

          if (resp > 0) {
            this.proyects[this.proyectoSeleccionado] = proyEdi;
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

  //----------------------------------------------------------------------FUNCIONES PARA DELETE-----------------------------------------------------------------

  deleteProyect() {
    const proy = this.proyects[this.proyectoSeleccionado];
    const idproy = proy.idProyecto;
    console.log(proy);

    this.portfolioService.eliminarProyecto(idproy).subscribe(resp => {

      this.responseStatusProyecto = resp;

      if (this.responseStatusProyecto > 0) {
        this.proyects = this.proyects.filter(x => x.idProyecto != idproy);
      }

    });
  }

  openDeleteProyectModal(i: number) {
    this.responseStatusProyecto = 0;
    this.proyectoSeleccionado = i;
    
  }

  //----------------------------------------------------------------------FUNCIONES PARA TODO-----------------------------------------------------------------

  closeModal() {
    this.responseStatusProyecto = 0;
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
    return this.formProyects.get(field)?.value.length > 0 && this.formProyects.get(field)?.value.trim().length > 0;
  }

  enableSaveProyectChangesButton(): boolean {
    let enabled: boolean = this.notAnEmptyField("nombreProyecto") && this.NombreProyecto?.errors == null;
    enabled &&= this.notAnEmptyField("descripcion") && this.DescripcionProy?.errors == null;
    enabled &&= this.notAnEmptyField("fechaInicio") && this.FechaInicioProy?.errors == null;
    enabled &&= (this.notAnEmptyField("fechaFin") && this.FechaFinProy?.errors == null) || !this.notAnEmptyField("fechaFin");
    enabled &&= this.notAnEmptyField("urlRepositorio") && this.UrlRepositorio?.errors == null;
    enabled &&= this.validateUrl(this.UrlRepositorio?.value);

    return enabled;
  }

  private showItemById(id: string) {
    document.getElementById(id)?.classList.remove("hide-item");
    document.getElementById(id)?.classList.add("show-item");
  }

  private hideItemById(id: string) {
    document.getElementById(id)?.classList.remove("show-item");
    document.getElementById(id)?.classList.add("hide-item");
  }

  validateUrl(url: string): boolean {
    try {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      const pruebaUrl = new URL(url);
      return true;
    }
    catch (err) {
      return false;
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------

  get NombreProyecto() {
    return this.formProyects.get("nombreProyecto");
  }

  get DescripcionProy() {
    return this.formProyects.get("descripcion");
  }

  get FechaInicioProy() {
    return this.formProyects.get("fechaInicio");
  }

  get FechaFinProy() {
    return this.formProyects.get("fechaFin");
  }

  get UrlRepositorio() {
    return this.formProyects.get("urlRepositorio");
  }

}
