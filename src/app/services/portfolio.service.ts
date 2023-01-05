import { Injectable } from '@angular/core';
import { Portfolio } from '../models/Portfolio.model';
import { Location } from '../models/Location.model';
import { Institution } from '../models/Institution.model';
import { Experience } from '../models/Experience.model';
import { Skill } from '../models/Skill.model';
import { Language } from '../models/Language.model';
import { Proyect } from '../models/Proyect.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  //TODO ver como hacer para no tener que usar el !
  private portfolio!: Portfolio;

  constructor() {
    this.createPortfolio();
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

  getLocation(): Location {
    return this.portfolio.getLocation();
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

    const lugar: Location = new Location();
    lugar.setCountry("Argentina");
    lugar.setCity("San Luis");
    lugar.setStreet("Mitre 618");
    let newPortfolio: Portfolio = new Portfolio(lugar, new Date(1995, 11, 8));

    newPortfolio.setName("Manuel");
    newPortfolio.setLastName("Gutiérrez");
    newPortfolio.setEmail("manu95gutierrez@gmail.com");
    newPortfolio.setSentence("");
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
      "Habilidad 1",
      "50"
    ));
    newPortfolio.addSkill(new Skill(
      "Habilidad 2",
      "50"
    ));
    newPortfolio.addSkill(new Skill(
      "Habilidad 3",
      "50"
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
