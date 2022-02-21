import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SECONDS_IN_MINUTE } from 'src/libs/interfaces/workout';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import {
  AddExercise,
  EditExercise,
} from 'src/app/state/workout/workout.actions';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.page.html',
  styleUrls: ['./add-exercise.page.scss'],
})
export class AddExercisePage implements OnInit, OnDestroy {
  exerciseGroup = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
    calories: new FormControl(),
    distance: new FormControl(),
    reps: new FormControl(),
    sets: new FormControl(),
    minutes: new FormControl(),
    seconds: new FormControl(),
    weight: new FormControl(),
  });
  exerciseExist = false;
  exercise;
  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private nav: NavController
  ) {}

  ngOnInit(): void {
    this.store
      .select(WorkoutState.exerciseById(this.route.snapshot.params.id))
      .subscribe((exercise) => {
        this.exercise = exercise;
        this.exerciseGroup.patchValue(exercise);
        this.exerciseExist = true;
      });
  }
  submit() {
    const { seconds, minutes, ...rest } = this.exerciseGroup.value;
    const result = {
      ...rest,
      id: this.exercise?.id ? this.exercise?.id : uuidv4(),
      seconds: seconds + minutes * SECONDS_IN_MINUTE,
    };
    console.log(this.exerciseExist);
    if (this.exerciseExist) {
      this.store.dispatch(new EditExercise(result));
    } else {
      this.store.dispatch(new AddExercise(result));
    }
    this.nav.pop();
  }
  ngOnDestroy(): void {}
}
