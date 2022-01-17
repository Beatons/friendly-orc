import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import { Workout } from 'src/libs/interfaces/workout';

@Component({
  selector: 'app-workout',
  templateUrl: 'workout.page.html',
  styleUrls: ['workout.page.scss'],
})
export class WorkoutPage {
  @Select(WorkoutState.workoutList) workoutList$: Observable<Workout[]>;
  constructor(private nav: NavController) {}
  addWorkout() {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'add-workout']);
  }
}
