import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteWorkout } from 'src/app/state/workout/workout.actions';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import { Workout } from 'src/libs/interfaces/workout';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
})
export class WorkoutListPage implements OnInit {
  @Select(WorkoutState.workoutList) workoutList$: Observable<Workout[]>;
  showTrashIcons = false;
  constructor(private nav: NavController, private readonly store: Store) {}
  addWorkout() {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'add-workout']);
  }
  editWorkout(id: string) {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'edit-workout', id]);
  }
  deleteWorkout(workout: Workout) {
    this.store.dispatch(new DeleteWorkout(workout.id));
  }
  ngOnInit(): void {}
  toggleTrashMode() {
    this.showTrashIcons = !this.showTrashIcons;
  }
}
