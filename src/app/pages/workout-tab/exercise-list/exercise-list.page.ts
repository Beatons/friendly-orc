import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteExercise } from 'src/app/state/workout/workout.actions';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import { Exercise } from 'src/libs/interfaces/workout';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.page.html',
  styleUrls: ['./exercise-list.page.scss'],
})
export class ExerciseListPage implements OnInit {
  @Select(WorkoutState.exerciseList) exerciseList$: Observable<Exercise[]>;
  showTrashIcons = false;
  constructor(private readonly store: Store, private nav: NavController) {}
  ngOnInit(): void {}
  addExercise() {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'add-exercise']);
  }
  editExercise(id: string) {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'edit-exercise', id]);
  }
  deleteExercise(exercise: Exercise) {
    this.store.dispatch(new DeleteExercise(exercise.id));
  }
  toggleTrashMode() {
    this.showTrashIcons = !this.showTrashIcons;
  }
}
