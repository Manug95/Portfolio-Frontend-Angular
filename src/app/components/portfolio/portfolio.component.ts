import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  loginStatus: boolean = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPersona().subscribe( data => {
      // sessionStorage.setItem("personaPortfolio", data);
      sessionStorage.setItem("personaPortfolio", JSON.stringify(data));
      // console.log(data.nombre);
    });
  }
}
