import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { BehaviorSubject, interval, of } from 'rxjs';
import {
  first,
  map,
  mapTo,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { WorkoutState } from 'src/app/state/workout/workout.state';
import { WorkoutNowService } from '../workout-now.service';

@Component({
  selector: 'app-working-out',
  templateUrl: './working-out.page.html',
  styleUrls: ['./working-out.page.scss'],
})
export class WorkingOutPage implements OnInit {
  workout$ = this.store.select(
    WorkoutState.workoutById(this.route.snapshot.params.id)
  );
  constructor(
    public readonly workoutService: WorkoutNowService,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly nav: NavController
  ) {}

  ngOnInit(): void {}
  pauseExercise() {
    this.workoutService.pauseExercise();
  }
  nextExercise() {
    this.workout$.pipe(first()).subscribe((workout) => {
      this.nav.navigateForward([
        '/',
        'tabs',
        'workout-now',
        'exercise-result',
        workout.id,
      ]);
    });
  }
  startExercise() {
    this.workoutService.startExercise();
  }
}
