import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { AutenticationService } from './services/autentication.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { GuardGuard } from './services/guard.guard';

const appRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "portfolio",
    component: PortfolioComponent,
    canActivate: [GuardGuard]
  },
  // {//este objeto es para cuando la ruta esta vacia lo redirija al componente login
  //   path: "",
  //   redirectTo: "login",
  //   pathMatch: "full"
  // }
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
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    //HttpClient,
    PortfolioService,
    LoginService,
    AutenticationService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
