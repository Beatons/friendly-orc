import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StatsState } from 'src/app/state/stats/stats.state';
import { ExerciseStats } from 'src/libs/interfaces/workout';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss'],
})
export class StatsPage {
  @Select(StatsState.stats) stats$: Observable<ExerciseStats[]>;
  constructor(private readonly nav: NavController) {}
  openCharts(id) {
    this.nav.navigateForward(['/', 'tabs', 'stats', id]);
  }
}
