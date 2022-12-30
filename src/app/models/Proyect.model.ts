export class Proyect {
    private proyectName: string = "";
    private description: string = "";
    private period: string = "";
    private link: string = "";

    constructor(proyeactName: string, description: string, period: string, link: string) {
        this.proyectName = proyeactName;
        this.description = description;
        this.period = period;
        this.link = link;
    }

    // getters y setters

    getProyectName(): string {
        return this.proyectName;
    }

    setProyectName(name: string): void {
        this.proyectName = name;
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

    getLink(): string {
        return this.link;
    }

    setLink(link: string): void {
        this.link = link;
    }
}