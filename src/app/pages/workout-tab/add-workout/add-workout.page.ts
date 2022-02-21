import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import {
  AddWorkout,
  DeleteWorkout,
  EditWorkout,
} from 'src/app/state/workout/workout.actions';
import { ActivatedRoute } from '@angular/router';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import {
  filter,
  first,
  map,
  pluck,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { Exercise, Workout } from 'src/libs/interfaces/workout';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.page.html',
  styleUrls: ['./add-workout.page.scss'],
})
export class AddWorkoutPage implements OnInit, OnDestroy {
  @Select(WorkoutState.exerciseList) exerciseList$: Observable<Exercise[]>;
  workoutNameControl = new FormControl();
  exerciseControl = new FormControl();
  destroy$ = new Subject();
  isEditing = false;
  exercise;
  localExerciseList = new BehaviorSubject([]);
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
        this.localExerciseList.next(res.exercises);
      });
  }

  addExercise(event) {
    if (event.detail.value) {
      this.exerciseList$.pipe(first()).subscribe((list) => {
        this.localExerciseList.next([
          ...this.localExerciseList.value,
          list.find((exercise) => exercise.id === event.detail.value),
        ]);
      });
      this.exerciseControl.patchValue(null);
    }
  }
  deleteExercise(index) {
    this.localExerciseList.next(
      this.localExerciseList.value.filter((e, i) => i === index)
    );
  }
  editExercise(id: Exercise) {}
  addWorkout() {
    if (!this.isEditing) {
      this.store.dispatch(
        new AddWorkout({
          exercises: this.localExerciseList.value,
          name: this.workoutNameControl.value,
          id: uuidv4(),
        })
      );
    } else {
      this.store.dispatch(
        new EditWorkout({
          exercises: this.localExerciseList.value,
          name: this.workoutNameControl.value,
          id: this.route.snapshot.params.id,
        })
      );
    }
    this.nav.pop();
  }
  ngOnDestroy(): void {
    this.isEditing = false;
    this.destroy$.next();
    this.destroy$.complete();
  }
}
