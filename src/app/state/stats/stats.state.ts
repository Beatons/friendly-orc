import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { WorkoutNowService } from 'src/app/pages/workout-now/workout-now.service';
import { Exercise } from 'src/libs/interfaces/workout';
import { AddStats } from './stats.actions';

export interface StatsModel {
  statsCollection: {
    [key: string]: Exercise[];
  };
}

@State<StatsModel>({
  name: 'stats',
  defaults: {
    statsCollection: {},
  },
})
@Injectable()
export class StatsState {
  constructor(public readonly workoutService: WorkoutNowService) {}
  @Action(AddStats)
  addStats(ctx: StateContext<StatsModel>, { exercise }: AddStats) {
    const { statsCollection } = ctx.getState();
    ctx.patchState({
      statsCollection: {
        ...statsCollection,
        [exercise.id]: [
          ...(statsCollection[exercise.id] || []),
          { ...exercise, date: new Date() },
        ],
      },
    });

    this.workoutService.nextExercise();
  }
}
