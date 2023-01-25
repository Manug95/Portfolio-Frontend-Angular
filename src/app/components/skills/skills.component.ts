import { Component } from '@angular/core';
import { Skill } from 'src/app/models/Skill.model';
import { LoginService } from 'src/app/services/login.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  loginStatus: boolean;
  skills: Skill[];

  constructor(private portfolioService: PortfolioService, private loginService: LoginService) {
    this.loginStatus = this.loginService.getLoginStatus();
    this.skills = this.portfolioService.getSkills();
  }

  esPar(n: number): boolean {
    return (n % 2) == 0;
  }

  esLaUltimaHabilidad(indice: number) {
    return indice == this.skills.length-1 && this.esPar(indice);
  }

}
