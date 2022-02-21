import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, interval } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
export type StateType =
  | 'STOP'
  | 'RUN'
  | 'RUNNING'
  | 'PAUSED'
  | 'REST'
  | 'RESTING'
  | 'RESTART';

@Injectable({
  providedIn: 'root',
})
export class WorkoutNowService {
  exerciseState = new BehaviorSubject<StateType>('STOP');
  times = [];
  timer = new BehaviorSubject(0);
  timer$ = this.timer.asObservable();
  currentExercise = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {
    console.log('initialized');
    interval(1000)
      .pipe(
        withLatestFrom(this.exerciseState.asObservable()),
        map((res) => res[1]),
        startWith(0)
      )
      .subscribe((res: StateType) => {
        console.log('counter');
        if (res === 'REST') {
          this.exerciseState.next('RESTING');
        } else if (res === 'RUN') {
          this.exerciseState.next('RUNNING');
        } else if (res === 'RESTING') {
          this.timer.next(this.timer.value + 1);
        } else if (res === 'RUNNING') {
          this.timer.next(this.timer.value + 1);
        } else if (res === 'RESTART') {
          this.timer.next(0);
          this.exerciseState.next('RUN');
        }
      });
  }
  initWorkout() {}
  pauseExercise() {
    this.exerciseState.next('PAUSED');
  }
  nextExercise() {
    this.exerciseState.next('STOP');
    this.exerciseState.next('RESTART');
    ++this.currentExercise;
  }
  startExercise() {
    if (this.exerciseState.value !== 'RUNNING') {
      this.exerciseState.next('RUN');
    } else {
      this.exerciseState.next('PAUSED');
    }
  }
}
