import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
export type StateType =
  | 'STOP'
  | 'RUNNING'
  | 'PAUSED'
  | 'REST'
  | 'RESTING'
  | 'END'
  | 'RESTART';

@Injectable({
  providedIn: 'root',
})
export class WorkoutNowService {
  exerciseState = new BehaviorSubject<StateType>('STOP');
  canStart$ = this.exerciseState
    .asObservable()
    .pipe(map((state) => state === 'PAUSED' || state === 'STOP'));
  canMoveOn$ = this.exerciseState
    .asObservable()
    .pipe(map((state) => state === 'RUNNING' || state === 'PAUSED'));
  canPause$ = this.exerciseState
    .asObservable()
    .pipe(map((state) => state === 'RUNNING' || state === 'RESTING'));
  times = [];
  timer = new BehaviorSubject(0);
  timer$ = this.timer.asObservable();
  currentExercise = 0;

  constructor() {
    console.log('initialized');
    interval(1000)
      .pipe(
        withLatestFrom(this.exerciseState.asObservable()),
        map((res) => res[1]),
        startWith(0)
      )
      .subscribe((res: StateType) => {
        console.log('counter', res);
        if (res === 'REST') {
          this.exerciseState.next('RESTING');
        } else if (res === 'RESTING') {
          if (this.timer.value < 120) {
            this.timer.next(this.timer.value + 1);
          } else {
            this.exerciseState.next('RESTART');
          }
        } else if (res === 'RUNNING') {
          this.timer.next(this.timer.value + 1);
        } else if (res === 'RESTART') {
          this.timer.next(0);
          this.exerciseState.next('RUNNING');
        }
      });
  }
  initWorkout() {}
  pauseExercise() {
    this.exerciseState.next('PAUSED');
  }
  nextExercise() {
    if (this.exerciseState.value !== 'END') {
      this.exerciseState.next('RESTART');
      ++this.currentExercise;
    }
  }
  startExercise() {
    if (this.exerciseState.value !== 'RUNNING') {
      this.exerciseState.next('RUNNING');
    } else {
      this.exerciseState.next('PAUSED');
    }
  }
  endWorkout() {
    this.exerciseState.next('END');
  }
}
