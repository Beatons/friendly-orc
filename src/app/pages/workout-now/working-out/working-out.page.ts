import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, interval, of } from 'rxjs';
import { mapTo, startWith, switchMap } from 'rxjs/operators';
import { WorkoutState } from 'src/app/state/workout/workout.state';

@Component({
  selector: 'app-working-out',
  templateUrl: './working-out.page.html',
  styleUrls: ['./working-out.page.scss'],
})
export class WorkingOutPage implements OnInit {
  exerciseState = new BehaviorSubject<
    'STOP' | 'RUN' | 'RUNNING' | 'PAUSED' | 'REST' | 'RESTING'
  >('STOP');
  times = [];
  timer = new BehaviorSubject(0);
  timer$ = this.timer.asObservable();
  currentExercise = 0;

  workout$ = this.store.select(
    WorkoutState.workoutById(this.route.snapshot.params.id)
  );

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.exerciseState
      .asObservable()
      .pipe(
        switchMap((state) => {
          if (state === 'RUNNING' || state === 'REST') {
            return interval(1000).pipe(mapTo(state));
          } else {
            return of(state);
          }
        }),
        startWith(0)
      )
      .subscribe((state) => {
        if (state === 'REST') {
          this.exerciseState.next('RESTING');
        } else if (state === 'RUN') {
          this.exerciseState.next('RUNNING');
        } else if (state === 'RESTING') {
          this.timer.next(this.timer.value + 1);
        } else if (state === 'RUNNING') {
          this.timer.next(this.timer.value + 1);
        } else if (state === 'STOP') {
          this.timer.next(0);
        }
      });
  }
  pauseExercise() {
    this.exerciseState.next('PAUSED');
  }
  nextExercise() {
    this.exerciseState.next('STOP');
    this.exerciseState.next('RUN');
    ++this.currentExercise;
  }
  startExercise() {
    this.exerciseState.next('RUN');
  }
}
