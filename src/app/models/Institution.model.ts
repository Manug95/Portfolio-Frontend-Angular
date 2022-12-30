export class Institution {
    private institutionName: string = "";
    private title: string = "";
    private period: string = "";
    private logo: string = "../../../assets/img/";

    constructor(institutionName: string, title: string, period: string, logo: string) {
        this.institutionName = institutionName;
        this.title = title;
        this.period = period;
        this.logo = this.logo + logo;
    }

    // getters y setters

    getInstitutionName(): string {
        return this.institutionName;
    }

    setInstitutionName(newName: string): void {
        this.institutionName = newName;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(newTitle: string) {
        this.title = newTitle;
    }

    getPeriod(): string {
        return this.period;
    }

    setPeriod(newPeriod: string) {
        this.period = newPeriod;
    }

    getUrlLogo(): string {
        return this.logo;
    }

    setLogo(nameLogo: string): void {
        this.logo = this.logo + nameLogo;
    }
}