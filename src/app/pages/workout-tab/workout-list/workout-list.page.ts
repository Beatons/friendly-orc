import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import { Workout } from 'src/libs/interfaces/workout';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
})
export class WorkoutListPage implements OnInit {
  @Select(WorkoutState.workoutList) workoutList$: Observable<Workout[]>;
  constructor(private nav: NavController) {}
  addWorkout() {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'add-workout']);
  }
  editWorkout(id: string) {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'edit-workout', id]);
  }
  ngOnInit(): void {}
}
