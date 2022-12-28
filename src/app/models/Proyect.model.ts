export class Proyect {
    private proyectName: string = "";
    private description: string = "";
    private link: string = "";

    constructor() {}

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

    getLink(): string {
        return this.link;
    }

    setLink(link: string): void {
        this.link = link;
    }
}