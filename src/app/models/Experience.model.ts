export class Experience {
    private job: string = "";
    private description: string = "";
    private period: string = "";
    private logo: string = "../../../assets/img/";

    constructor(job: string, description: string, period: string, logo:string) {
        this.job = job;
        this.description = description;
        this.period = period;
        this.logo = this.logo + logo;
    }

    // getters y setters

    getJob(): string {
        return this.job;
    }

    setJob(job: string): void {
        this.job = job;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    getPeriod(): string {
        return this.period;
    }

    setPeriod(period: string): void {
        this.period = period;
    }

    getUrlLogo(): string {
        return this.logo;
    }

    setLogo(logoName: string): void {
        this.logo = this.logo + logoName;
    }
}