import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutPage } from './workout.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutPage,
  },
  {
    path: 'add-workout',
    loadChildren: () =>
      import('./add-workout/add-workout.module').then(
        (m) => m.AddWorkoutModule
      ),
  },
  {
    path: 'add-exercise',
    loadChildren: () =>
      import('./add-exercise/add-exercise.module').then(
        (m) => m.AddExerciseModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutPageRoutingModule {}
