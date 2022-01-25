import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutNowPage } from './workout-now.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutNowPage,
  },
  {
    path: 'working-out/:id',
    loadChildren: () =>
      import('./working-out/working-out.module').then(
        (m) => m.WorkingOutPageModule
      ),
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [WorkoutNowPage],
})
export class WorkoutNowPageModule {}
