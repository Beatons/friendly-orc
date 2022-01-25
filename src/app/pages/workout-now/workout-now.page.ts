import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import { Workout } from 'src/libs/interfaces/workout';

@Component({
  selector: 'app-workout-now',
  templateUrl: 'workout-now.page.html',
  styleUrls: ['workout-now.page.scss'],
})
export class WorkoutNowPage {
  @Select(WorkoutState.workoutList) workoutList$: Observable<Workout[]>;
  constructor(private readonly nav: NavController) {}
  startWorkout(workout) {
    this.nav.navigateForward([
      '/',
      'tabs',
      'workout-now',
      'working-out',
      workout.id,
    ]);
  }
}
