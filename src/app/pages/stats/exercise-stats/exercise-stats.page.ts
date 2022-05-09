import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { StatsState } from 'src/app/state/stats/stats.state';
import Chart from 'chart.js/auto';
import { zeroPad } from 'src/libs/functions/common';

@Component({
  selector: 'app-exercise-stats',
  templateUrl: './exercise-stats.page.html',
  styleUrls: ['./exercise-stats.page.scss'],
})
export class ExerciseStatsPage {
  stats$ = this.store.select(
    StatsState.statsById(this.route.snapshot.params.id)
  );
  ctx;
  chart;
  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}
  ionViewDidEnter() {
    this.ctx = document.getElementById('canvas') as HTMLCanvasElement;
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['Blue', 'Orange', 'green'],
        datasets: [
          {
            data: [1, 2, 4],
            fill: true,
            backgroundColor: 'orange',
            borderColor: 'green',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          filler: {
            propagate: false,
          },
        },
        interaction: {
          intersect: false,
        },
      },
    });
    this.stats$.subscribe((stats) => {
      console.log(stats);
      this.chart.data.labels = stats.stats.map((stat) => {
        const date = new Date(stat.date);
        return `${zeroPad(date.getDate())}.${zeroPad(date.getMonth())}`;
      });
      this.chart.data.datasets.forEach((dataset) => {
        dataset.data = stats.stats.map((stat) => stat.weight);
      });
      this.chart.update();
    });
  }
  ionViewWillLeave(): void {
    this.chart.destroy();
  }
}
