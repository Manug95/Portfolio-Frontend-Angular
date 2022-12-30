export class Skill {
    private skillName: string = "";
    private progress: string = "0";

    constructor(skillName: string, progress: string) {
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

    getProgress(): string {
        return this.progress;
    }

    setProgress(progress: string) {
        this.progress = progress;
    }
}