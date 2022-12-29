import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/models/Location.model';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  name: string = "";
  age: string = "";
  location: Location = new Location();

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.name = this.portfolioService.getName()
      + this.portfolioService.getLastName();
  }


}
