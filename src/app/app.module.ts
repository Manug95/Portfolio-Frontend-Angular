import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

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

const appRoutes: Routes = [
  
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
    ProyectsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
