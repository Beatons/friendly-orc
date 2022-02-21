import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { first, map, pluck } from 'rxjs/operators';
import { AddStats } from 'src/app/state/stats/stats.actions';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import { Workout } from 'src/libs/interfaces/workout';
import { WorkoutNowService } from '../workout-now.service';

@Component({
  selector: 'app-exercise-result',
  templateUrl: './exercise-result.component.html',
  styleUrls: ['./exercise-result.component.scss'],
})
export class ExerciseResultPage implements OnInit {
  workout$ = this.store.select(
    WorkoutState.workoutById(this.route.snapshot.params.id)
  );
  exercise$ = this.workout$.pipe(
    pluck('exercises'),
    map((list) => list[this.workoutService.currentExercise])
  );
  resultFormGroup = new FormGroup({
    reps: new FormControl(),
    weight: new FormControl(),
    sets: new FormControl(),
    calories: new FormControl(),
    distance: new FormControl(),
    seconds: new FormControl(),
  });
  constructor(
    private readonly nav: NavController,
    private readonly workoutService: WorkoutNowService,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}
  ngOnInit(): void {
    this.workout$.pipe(first()).subscribe((workout: Workout) => {
      const exercise = workout.exercises[this.workoutService.currentExercise];
      this.resultFormGroup.patchValue(exercise);
    });
  }
  submit() {
    this.exercise$.pipe(first()).subscribe((exercise) => {
      console.log(exercise);
      const newExercise = { ...exercise, ...this.resultFormGroup.value };
      this.store.dispatch(new AddStats(newExercise));
      this.nav.back();
    });
  }
}
