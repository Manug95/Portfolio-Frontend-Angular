import { Component, Input, OnInit } from '@angular/core';

import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';

import { PieChartModel } from 'src/app/models/PieChart.model';
import { DATA_ADV_PIE_CHART } from 'src/app/models/data-pie-chart';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  data: PieChartModel[] = [];
  view: [number, number] = [800, 200];

  @Input() skill: string = "";
  @Input() progress: number = 0;

  // options
  legendTitle: string = "";
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  // below = LegendPosition.Below;
  right = LegendPosition.Right;
  maxLabelLength: number = 15;

  // colorScheme = {
  //   domain: ['#ffc107', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#A10A28', '#ffc107']
  };

  constructor() {
    // Object.assign(this, { DATA_ADV_PIE_CHART });
  }

  ngOnInit(): void {
    let name: string = this.skill + " por Aprender";
    let progress: number = 100 - this.progress;

    this.data.push(new PieChartModel(name, progress));
    this.data.push(new PieChartModel(this.skill, this.progress));
    this.legendTitle = this.skill;
  }

  // onSelect(data): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }
}
