import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'workout-tab',
        loadChildren: () =>
          import('../workout-tab/workout.module').then(
            (m) => m.WorkoutPageModule
          ),
      },
      {
        path: 'workout-now',
        loadChildren: () =>
          import('../workout-now/workout-now.module').then(
            (m) => m.WorkoutNowPageModule
          ),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('../stats/stats.module').then((m) => m.StatsPageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/workout-tab',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/workout-tab',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
