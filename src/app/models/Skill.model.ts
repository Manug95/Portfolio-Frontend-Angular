export class Skill {
    private skillName: string = "";
    private progress: number = 0;

    constructor() {}

    // getters y setters

    getSkillName(): string {
        return this.skillName;
    }

    setSkillName(skill: string): void {
        this.skillName = skill;
    }

    getProgress(): number {
        return this.progress;
    }

    setProgress(progress: number) {
        this.progress = progress;
    }
}