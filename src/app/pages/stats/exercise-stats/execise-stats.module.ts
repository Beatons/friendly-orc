import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseStatsPage } from './exercise-stats.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ExerciseStatsPage,
  },
];

@NgModule({
  declarations: [ExerciseStatsPage],
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
  exports: [],
  providers: [],
})
export class ExerciseStatsPageModule {}
