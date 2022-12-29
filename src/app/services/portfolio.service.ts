import { Injectable } from '@angular/core';
import { Portfolio } from '../models/Portfolio.model';
import { Location } from '../models/Location.model';
import { Institution } from '../models/Institution.model';
import { Experience } from '../models/Experience.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private portfolio!: Portfolio;//ashashkgaghalkga

  constructor() {
    this.createPortfolio();
  }

  getName(): string {
    return this.portfolio.getName();
  }

  getLastName(): string {
    return this.portfolio.getLastName();
  }

  //------------------------------------------------------------------------------------------------------------

  private createPortfolio() {

    const lugar: Location = new Location();
    lugar.setCountry("Argentina");
    lugar.setCity("San Luis");
    lugar.setStreet("Mitre 618");
    let newPortfolio: Portfolio = new Portfolio(lugar);

    newPortfolio.setName("Manuel");
    newPortfolio.setLastName("Gutiérrez");
    newPortfolio.setEmail("manu95gutierrez@gmail.com");
    newPortfolio.setSentence("");
    // newPortfolio.setLocation();

    newPortfolio.addEducationInstitution(new Institution(
      "Instituto Centro de Enseñanza Agrotécnico (I.C.E.A) - Héctor V. Noblía",
      "Título Secundario: Bachiller Agrario",
      "Período: 2008 - 2013"
    ));

    newPortfolio.addExperience(new Experience());

    this.portfolio = newPortfolio;
  }
}
