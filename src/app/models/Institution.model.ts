export class Institution {
    private institutionName: string = "";
    private title: string = "";
    private period: string = "";
    private logo: string = "";

    constructor() {}

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
}