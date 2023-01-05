import { Experience } from "./Experience.model";
import { Institution } from "./Institution.model";
import { Language } from "./Language.model";
import { Location } from "./Location.model";
import { Proyect } from "./Proyect.model";
import { Skill } from "./Skill.model";

export class Portfolio {

    private name: string = "";
    private lastName: string = "";
    private email: string = "";
    private dob: Date;
    private sentence: string = "";
    private location: Location;
    private education: Institution[] = [];
    private experience: Experience[] = [];
    private skills: Skill[] = [];
    private languages: Language[] = [];
    private proyects: Proyect[] = [];
    private social: string[] = [];

    constructor(location: Location, dob: Date) {
        this.location = location;
        this.dob = dob;
    }

    // getters y setters

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    getDob(): Date {
        return this.dob;
    }

    setDob(dob: Date): void {
        this.dob = dob;
    }

    getSentence(): string {
        return this.sentence;
    }

    setSentence(sentence: string): void {
        this.sentence = sentence;
    }

    getLocation(): Location {
        return this.location;
    }

    setLocation(location: Location): void {
        this.location = location;
    }

    getEducation(): Institution[] {
        return this.education;
    }

    addEducationInstitution(institution: Institution): void {
        this.education.push(institution);
    }

    getExperience(): Experience[] {
        return this.experience;
    }

    addExperience(experience: Experience): void {
        this.experience.push(experience);
    }

    getSkills(): Skill[] {
        return this.skills;
    }

    addSkill(skill: Skill): void {
        this.skills.push(skill);
    }

    getLanguages(): Language[] {
        return this.languages;
    }

    addLanguage(lang: Language): void {
        this.languages.push(lang);
    }

    getProyects(): Proyect[] {
        return this.proyects;
    }

    addProyect(proyect: Proyect): void {
        this.proyects.push(proyect);
    }

    getSocials(): string[] {
        return this.social;
    }

    setSocial(social: string): void {
        this.social.push(social);
    }
}