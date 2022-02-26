import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ClearStats } from 'src/app/state/stats/stats.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  resetStats() {
    this.store.dispatch(new ClearStats());
  }
}
