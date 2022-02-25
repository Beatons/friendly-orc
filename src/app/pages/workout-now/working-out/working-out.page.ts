import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import { Workout } from 'src/libs/interfaces/workout';
import { WorkoutNowService } from '../workout-now.service';

@Component({
  selector: 'app-working-out',
  templateUrl: './working-out.page.html',
  styleUrls: ['./working-out.page.scss'],
})
export class WorkingOutPage implements OnInit, OnDestroy {
  workout$ = this.store.select(
    WorkoutState.workoutById(this.route.snapshot.params.id)
  );
  hasEnded = false;
  destroy$ = new Subject();
  constructor(
    public readonly workoutService: WorkoutNowService,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly nav: NavController
  ) {}

  ngOnInit(): void {
    this.workoutService.initWorkout();
    this.workoutService.ended$
      .pipe(takeUntil(this.destroy$))
      .subscribe((end) => {
        this.hasEnded = end;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.workoutService.destroy();
  }
  pauseExercise() {
    this.workoutService.pauseExercise();
  }
  nextExercise() {
    this.workoutService.pauseExercise();
    this.workout$.pipe(first()).subscribe((workout: Workout) => {
      this.nav.navigateForward([
        '/',
        'tabs',
        'workout-now',
        'exercise-result',
        workout.id,
      ]);
      if (
        workout.exercises.length - 1 ===
        this.workoutService.currentExercise
      ) {
        this.workoutService.endWorkout();
      }
    });
  }
  moveBack() {
    this.nav.navigateBack(['/', 'tabs', 'workout-now']);
  }
  startExercise() {
    this.workoutService.startExercise();
  }
}
