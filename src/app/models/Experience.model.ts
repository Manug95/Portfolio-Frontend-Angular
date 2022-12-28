export class Experience {
    private job: string = "";
    private description: string = "";

    constructor() {}

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
}