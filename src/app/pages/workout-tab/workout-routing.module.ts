import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutPage } from './workout.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutPage,
  },
  {
    path: 'workout-list',
    loadChildren: () =>
      import('./workout-list/workout-list.module').then(
        (m) => m.WorkoutListModule
      ),
  },
  {
    path: 'exercise-list',
    loadChildren: () =>
      import('./exercise-list/exercise-list.module').then(
        (m) => m.ExerciseListModule
      ),
  },
  {
    path: 'edit-exercise/:id',
    loadChildren: () =>
      import('./add-exercise/add-exercise.module').then(
        (m) => m.AddExerciseModule
      ),
  },
  {
    path: 'edit-workout/:id',
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
  {
    path: 'add-workout',
    loadChildren: () =>
      import('./add-workout/add-workout.module').then(
        (m) => m.AddWorkoutModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutPageRoutingModule {}
