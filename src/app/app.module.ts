import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { ProyectsComponent } from './components/proyects/proyects.component';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

import { PortfolioService } from './services/portfolio.service';
import { LoginService } from './services/login.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const appRoutes: Routes = [
  {
    path: "",
    component: PortfolioComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    AboutMeComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    LanguagesComponent,
    ProyectsComponent,
    LoginComponent,
    PortfolioComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    PortfolioService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
