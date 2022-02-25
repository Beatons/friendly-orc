import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StatsState } from 'src/app/state/stats/stats.state';

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss'],
})
export class StatsPage {
  @Select(StatsState.stats) stats$: Observable<any>;
  constructor() {}
}
