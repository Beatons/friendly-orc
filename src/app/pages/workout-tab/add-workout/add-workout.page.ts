import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import {
  AddWorkout,
  DeleteWorkout,
  EditWorkout,
} from 'src/app/state/workout/workout.actions';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import { filter, pluck, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Exercise, Workout } from 'src/libs/interfaces/workout';
@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.page.html',
  styleUrls: ['./add-workout.page.scss'],
})
export class AddWorkoutPage implements OnInit, OnDestroy {
  workoutNameControl = new FormControl();
  destroy$ = new Subject();
  isEditing = false;
  exercise;
  constructor(
    private readonly route: ActivatedRoute,
    private nav: NavController,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        pluck('id'),
        switchMap((id) => this.store.select(WorkoutState.workoutById(id))),
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe((res: Workout) => {
        this.isEditing = true;
        this.workoutNameControl.patchValue(res.name);
      });
  }

  addExercise() {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'add-exercise']);
  }
  editExercise(id: Exercise) {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'edit-exercise', id]);
  }
  deleteWorkout() {
    this.store
      .dispatch(new DeleteWorkout(this.route.snapshot.params.id))
      .subscribe(() => {
        this.nav.navigateBack(['/', 'tabs', 'workout-tab']);
      });
  }
  addWorkout() {
    if (!this.isEditing) {
      //   this.store.dispatch(
      //     new AddWorkout({
      //       exercises: this.workoutService.getExercises(),
      //       name: this.workoutNameControl.value,
      //       id: uuidv4(),
      //     })
      //   );
      // } else {
      //   this.store.dispatch(
      //     new EditWorkout({
      //       exercises: this.workoutService.getExercises(),
      //       name: this.workoutNameControl.value,
      //     })
      //   );
    }
    this.nav.pop();
  }
  ngOnDestroy(): void {
    this.isEditing = false;
    this.destroy$.next();
    this.destroy$.complete();
  }
}
