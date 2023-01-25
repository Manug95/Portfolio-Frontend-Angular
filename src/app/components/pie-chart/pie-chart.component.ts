import { Component, Input, OnInit } from '@angular/core';

import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';

import { PieChartModel } from 'src/app/models/PieChart.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  data: PieChartModel[] = [];
  view: [number, number] = [300, 200];
  containerDiv: HTMLCollection;
  containerElement: HTMLElement;

  @Input() skill: string = "";
  @Input() progress: number = 0;
  @Input() i: number = 0;

  // options
  legendTitle: string = "";
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  // below = LegendPosition.Below;
  // right = LegendPosition.Right;
  // maxLabelLength: number = 15;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#A10A28', '#ffc107']
  };

  constructor() {
    this.containerDiv = <HTMLCollection>document!.getElementsByClassName('chart-container');
    this.containerElement = <HTMLElement>this.containerDiv.item(this.i);
  }

  ngOnInit(): void {
    let name: string = this.skill + " por Aprender";
    let progress: number = 100 - this.progress;

    this.data.push(new PieChartModel(name, progress));
    this.data.push(new PieChartModel(this.skill, this.progress));
    this.legendTitle = this.skill;

    this.containerDiv = <HTMLCollection>document!.getElementsByClassName('chart-container');
    this.containerElement = <HTMLElement>this.containerDiv.item(this.i);
  }

  /* ---- Auto resize chart ---- */
  resizeChart(width: any, height: any): void {
    this.view = [width, 300];
  }
}
