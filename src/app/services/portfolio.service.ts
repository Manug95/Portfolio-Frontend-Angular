import { Injectable, OnInit } from '@angular/core';
import { Portfolio } from '../models/Portfolio.model';
import { Adress } from '../models/Adress.model';
import { Institution } from '../models/Institution.model';
import { Experience } from '../models/Experience.model';
import { Skill } from '../models/Skill.model';
import { Language } from '../models/Language.model';
import { Proyect } from '../models/Proyect.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url: string = "http://localhost:8080/";

  //TODO ver como hacer para no tener que usar el !
  private portfolio!: Portfolio;
  public onLoginChange = new Subject<any>();
  //public onLoginChange = new BehaviorSubject<any>(JSON.parse("{}"));

  constructor(private httpClient: HttpClient, private autenticationService: AutenticationService) {
    this.createPortfolio();
  }

  getPersona(): Observable<any> {
    let currentUser = this.autenticationService.getUserAutenticated();

    let id = currentUser.idPersona;

    return this.httpClient.get<any>(this.url + `personas/traer?id=${id}`);
  }

  //-------------------sobre mi-------------------------------------

  editarSobreMi(value: string): Observable<any> {
    let persona = JSON.parse( sessionStorage.getItem("personaPortfolio") || "{}" );
    persona.sobreMi = value;
    return this.httpClient.put(this.url + `personas/editar`, persona, {observe: "response"});
  }

  //-------------------educacion------------------------------------

  editarEducacion(educacionEditada: any): Observable<any> {

    const id = this.autenticationService.getUserAutenticated().idPersona;

    return this.httpClient.put(this.url + `educacion/editar?idPersona=${id}`, educacionEditada);

  }

  agregarEducacion(nuevaEducacion: any): Observable<any> {

    const id = this.autenticationService.getUserAutenticated().idPersona;

    return this.httpClient.post(this.url + `educacion/guardar?idPersona=${id}`, nuevaEducacion);

  }

  eliminarEducacion(idEdu: number): Observable<any> {

    const id = this.autenticationService.getUserAutenticated().idPersona;

    return this.httpClient.delete(this.url + `educacion/eliminar?idEducacion=${idEdu}&idPersona=${id}`);

  }






  


  getName(): string {
    return this.portfolio.getName();
  }

  getLastName(): string {
    return this.portfolio.getLastName();
  }

  getEmail(): string {
    return this.portfolio.getEmail();
  }

  getDob(): Date {
    return this.portfolio.getDob();
  }

  getAdress(): Adress {
    return this.portfolio.getAdress();
  }
  
  getEducation(): Institution[] {
    return this.portfolio.getEducation();
  }

  getExperience(): Experience[] {
    return this.portfolio.getExperience();
  }

  getSkills(): Skill[] {
    return this.portfolio.getSkills();
  }

  getLanguages(): Language[] {
    return this.portfolio.getLanguages();
  }

  getProyects(): Proyect[] {
    return this.portfolio.getProyects();
  }

  //------------------------------------------------------------------------------------------------------------

  private createPortfolio() {

    const lugar: Adress = new Adress();
    lugar.setCountry("Argentina");
    lugar.setCity("San Luis");
    lugar.setStreet("Mitre 618");
    let newPortfolio: Portfolio = new Portfolio(lugar, new Date(1995, 11, 8));

    newPortfolio.setName("Manuel");
    newPortfolio.setLastName("Gutiérrez");
    newPortfolio.setEmail("manu95gutierrez@gmail.com");
    newPortfolio.setAboutMe("");
    // newPortfolio.setLocation();

    newPortfolio.addEducationInstitution(new Institution(
      "Instituto Centro de Enseñanza Agrotécnico (I.C.E.A) - Héctor V. Noblía",
      "Título Secundario: Bachiller Agrario",
      "Período: 2008 - 2013",
      "logo-ICEA.jpg"
    ));
    newPortfolio.addEducationInstitution(new Institution(
      "Universidad de La Punta",
      "Título: Técnico Universitario en Desarrollo de Software",
      "Período: 2021 - 2022",
      "logo-ulp.jpg"
    ));
    newPortfolio.addEducationInstitution(new Institution(
      "Argentina Programa",
      "Título: Desarrollador Fullstack Web Junior",
      "Período: 2022 - 2023",
      "favicon-Argentina-Programa.ico"
    ));

    newPortfolio.addExperience(new Experience(
      "Metalúrgica Pampa",
      "Asistenete de Administración",
      "Período: 2021-2022",
      "metalurgica-pampa.jpg"
    ));

    newPortfolio.addSkill(new Skill(
      "HTML",
      50
    ));
    newPortfolio.addSkill(new Skill(
      "CSS",
      50
    ));
    newPortfolio.addSkill(new Skill(
      "JavaScript",
      50
    ));

    newPortfolio.addLanguage(new Language("Inglés", 50));
    newPortfolio.addLanguage(new Language("Italiano", 50));

    newPortfolio.addProyect(new Proyect(
      "Proyecto Integrador Portfolio Web Full Stack",
      `Desarrollar una aplicación web full stack, que mostrará: tus datos personales, estudios cursados, experiencia
      laboral, conocimiento de las tecnologías y lo que desees agregar. Es decir, ¡crear tu propio portfolio web!
      Esta aplicación deberá ser de arquitectura distribuida y contener un diseño de interfaz de usuario (front end)
      que muestre la información, una base de datos que almacene los datos antes mencionados y debe contar con las
      APIs necesarias para proveer a través de internet la información (back end).`,
      "2022 - 2023",
      "https://github.com/Manug95/Portfolio-Frontend"
    ));

    // newPortfolio.setSocial();

    this.portfolio = newPortfolio;
  }
}
