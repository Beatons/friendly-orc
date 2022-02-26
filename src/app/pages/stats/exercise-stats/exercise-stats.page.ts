import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { StatsState } from 'src/app/state/stats/stats.state';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-exercise-stats',
  templateUrl: './exercise-stats.page.html',
  styleUrls: ['./exercise-stats.page.scss'],
})
export class ExerciseStatsPage implements OnInit {
  stats$ = this.store.select(
    StatsState.statsById(this.route.snapshot.params.id)
  );
  barData = [
    { season: 'S1', viewers: 2500000 },
    { season: 'S2', viewers: 3800000 },
    { season: 'S3', viewers: 5000000 },
    { season: 'S4', viewers: 6900000 },
    { season: 'S5', viewers: 6900000 },
    { season: 'S6', viewers: 7500000 },
    { season: 'S7', viewers: 10000000 },
    { season: 'S8', viewers: 17000000 },
  ];
  data = [];
  title = 'Game of Thrones';
  subtitle = 'Viewers per season for';
  margin = { top: 20, right: 40, bottom: 30, left: 80 };
  width = 900 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  x: any;
  y: any;
  svg: any;
  g: any;
  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}
  ionViewDidEnter() {
    this.init();
    this.initAxes();
    this.drawAxes();
    this.drawChart();
  }
  ngOnInit(): void {
    this.stats$.subscribe((stats) => {
      console.log(stats);
      this.data = stats.stats;
    });
  }
  init() {
    this.svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  initAxes() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.data.map((d) => new Date(d.date).getTime()));
    this.y.domain([0, d3Array.max(this.data, (d) => d.distance)]);
  }

  drawAxes() {
    this.g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x))
      .attr('font-size', '30');
    this.g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .attr('fill', 'rgb(34, 167, 240)')
      .attr('font-size', '50');
  }

  drawChart() {
    this.g
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', 'rgb(34, 167, 240)')
      .attr('x', (d) => this.x(new Date(d.date).getTime()))
      .attr('y', (d) => this.y(d.distance))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.distance));
  }
}
