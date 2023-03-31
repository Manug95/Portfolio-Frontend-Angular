import { Component } from '@angular/core';
import { Skill } from 'src/app/models/Skill.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  loginStatus: boolean;
  skills: any[] = [];

  formSkills: FormGroup;

  tituloModal:string = "";
  erroresFechas: string[] = [];
  responseStatusHabilidad: number = 0;
  habilidadSeleccionada: number = -1;

  constructor(private portfolioService: PortfolioService, private loginService: LoginService, private formBuilder: FormBuilder) {
    this.loginStatus = this.loginService.getLoginStatus();
    // this.skills = this.portfolioService.getSkills();

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
          this.skills = data.habilidades.filter((h: { tipoHabilidad: string; }) => h.tipoHabilidad.toLowerCase() != "languaje");
        }
      }
    });

    this.formSkills = this.formBuilder.group(
      {
        nombreHabilidad: ["", [Validators.maxLength(45)]],
        tipoHabilidad: ["", [Validators.maxLength(45)]],
        progreso: ["", [Validators.required, Validators.max(100), Validators.min(0)]]
      }
    );
    
  }

  //----------------------------------------------------------------------FUNCIONES AÑADIR-----------------------------------------------------------------

  openAddSkillModal() {
    this.tituloModal = "Agregar Habilidad";

    this.formSkills.get("nombreHabilidad")?.setValue("");
    this.formSkills.get("tipoHabilidad")?.setValue("");
    this.formSkills.get("progreso")?.setValue(0);

    this.showItemById("btn-save-skill");
    this.hideItemById("btn-save-changes-skill");
  }

  saveSkill() {

    const newskill = {
      nombreHabilidad: this.formSkills.value.nombreHabilidad,
      tipoHabilidad: this.formSkills.value.tipoHabilidad,
      progreso: this.formSkills.value.progreso
    }
    console.log(newskill);

    this.portfolioService.agregarHabilidad(newskill).subscribe(resp => {
      console.log("respuesta: "+resp);

      if (resp != null) {
        if (resp > 0) {
          this.skills.push({
            idHabilidad: resp,
            ...newskill
          });

          this.responseStatusHabilidad = 1;
          console.log("se actualizo el arreglo");
        } else {
          this.responseStatusHabilidad = -1;
        }
      } else {
        this.responseStatusHabilidad = -1;
      }

    });

  }

  //---------------------------------------------------------------------FUNCIONES EDITAR------------------------------------------------------------------

  openEditSkillModal(i: number) {
    let skill = this.skills[i];
    this.habilidadSeleccionada = i;

    this.tituloModal = "Editar Habilidad";

    this.showItemById("btn-save-changes-skill");
    this.hideItemById("btn-save-skill");

    //seteo los values de los form control
    this.formSkills.get("nombreHabilidad")?.setValue(skill.nombreHabilidad);
    this.formSkills.get("tipoHabilidad")?.setValue(skill.tipoHabilidad);
    this.formSkills.get("progreso")?.setValue(skill.progreso);
  }

  saveChangesSkill() {

    const skillEdi = {
      idHabilidad: this.skills[this.habilidadSeleccionada].idHabilidad,
      nombreHabilidad: this.formSkills.value.nombreHabilidad,
      tipoHabilidad: this.formSkills.value.tipoHabilidad,
      progreso: this.formSkills.value.progreso
    }
    console.log(skillEdi);

    this.portfolioService.editarHabilidad(skillEdi).subscribe(resp => {
      
      this.responseStatusHabilidad = resp;

      if (resp > 0) {
        this.skills[this.habilidadSeleccionada] = skillEdi;
        console.log("se actualizo el arreglo");
      }

    });

  }

  //----------------------------------------------------------------------FUNCIONES PARA DELETE-----------------------------------------------------------------

  deleteSkill() {
    const skill = this.skills[this.habilidadSeleccionada];
    const idSkill = skill.idHabilidad;
    console.log(skill);

    this.portfolioService.eliminarHabilidad(idSkill).subscribe(resp => {

      this.responseStatusHabilidad = resp;

      if (this.responseStatusHabilidad > 0) {
        this.skills = this.skills.filter(x => x.idHabilidad != idSkill);
      }

    });
  }

  openDeleteSkillModal(i: number) {
    this.responseStatusHabilidad = 0;
    this.habilidadSeleccionada = i;
    
  }

  //----------------------------------------------------------------------FUNCIONES PARA TODO-----------------------------------------------------------------

  closeModal() {
    this.responseStatusHabilidad = 0;
  }

  notAnEmptyField(field: string): boolean {
    return this.formSkills.get(field)?.value.length > 0 && this.formSkills.get(field)?.value.trim().length > 0;
  }

  enableSaveSkillChangesButton(): boolean {
    let enabled: boolean = this.notAnEmptyField("nombreHabilidad") && this.NombreHabilidad?.errors == null;
    enabled &&= this.notAnEmptyField("tipoHabilidad") && this.TipoHabilidad?.errors == null;
    enabled &&= this.Progreso?.errors == null;

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

  esPar(n: number): boolean {
    return (n % 2) == 0;
  }

  esLaUltimaHabilidad(indice: number) {
    return indice == this.skills.length-1 && this.esPar(indice);
  }

  //---------------------------------------------------------------------------------------------------------------------------------------

  get NombreHabilidad() {
    return this.formSkills.get("nombreHabilidad");
  }

  get TipoHabilidad() {
    return this.formSkills.get("tipoHabilidad");
  }

  get Progreso() {
    return this.formSkills.get("progreso");
  }

}
