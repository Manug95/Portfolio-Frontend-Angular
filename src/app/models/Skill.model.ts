export class Skill {
    private skillName: string = "";
    private progress: number = 0;

    constructor(skillName: string, progress: number) {
        this.skillName = skillName;
        this.progress = progress;
    }

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