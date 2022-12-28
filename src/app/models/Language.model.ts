export class Language {
    private lang: string = "";
    private progress: number = 0;

    constructor() {}

    // gettes y setters

    getLang(): string {
        return this.lang;
    }

    setLang(lang: string): void {
        this.lang = lang;
    }

    getProgress(): number {
        return this.progress;
    }

    setProgress(progress: number) {
        this.progress = progress;
    }
}