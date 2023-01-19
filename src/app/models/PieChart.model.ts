export class PieChartModel {
  name: string = "";
  value: number = 0;

  constructor(name?: string, value?: number){
    if(name) {
      this.name = name;
    }
    if(value) {
      this.value = value;
    }
  }
}