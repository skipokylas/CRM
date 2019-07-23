import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { IAnalytics, IAnalyticsChart } from '../shared/interfaces';
import { Chart } from 'chart.js';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-analitics-page',
  templateUrl: './analitics-page.component.html',
  styleUrls: ['./analitics-page.component.scss']
})
export class AnaliticsPageComponent implements OnInit {
  @ViewChild('profit', { static: true }) profitRef: ElementRef;
  @ViewChild('order', { static: true }) orderRef: ElementRef;

  average: number;
  pending = true;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit() {
    this.analyticsService
      .getAnalytics()
      .pipe(first())
      .subscribe((analytics: IAnalytics) => {
        this.average = analytics.average;

        const profitConfig = this.createConfig('Profit', 'rgb(255, 99, 132)', analytics.chart, 'profit');
        const orderConfig = this.createConfig('Orders', 'rgb(54, 162, 235)', analytics.chart, 'order');

        this.initChart(this.profitRef, '400px', profitConfig);
        this.initChart(this.orderRef, '400px', orderConfig);

        this.pending = false;
      });
  }

  createConfig(label: string, color: string, chart: IAnalyticsChart[], target: string): any {
    const labels = chart.map(item => item.label);
    const data = chart.map(item => item[target]);
    // ----- Test data  -----
    // labels.push('08.07.2019');
    // labels.push('09.07.2019');
    // labels.push('10.07.2019');
    // data.push(8);
    // data.push(4);
    // data.push(6);

    return {
      type: 'line',
      options: { responsive: true },
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: color,
            steppedLine: false,
            fill: false
          }
        ]
      }
    };
  }

  initChart(ref: ElementRef, height: string, config): Chart {
    const ctx = ref.nativeElement.getContext('2d');
    ctx.canvas.height = height;
    return new Chart(ctx, config);
  }
}
