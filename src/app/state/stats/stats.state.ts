import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { WorkoutNowService } from 'src/app/pages/workout-now/workout-now.service';
import { ExerciseStats } from 'src/libs/interfaces/workout';
import { AddStats, ClearStats } from './stats.actions';

export interface StatsModel {
  statsCollection: {
    [key: string]: ExerciseStats;
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
  static statsById(id: string) {
    return createSelector([StatsState.stats], (stats) =>
      stats.find((stat) => stat.id === id)
    );
  }
  @Selector()
  static stats(state: StatsModel) {
    return Object.values(state.statsCollection);
  }

  @Action(AddStats)
  addStats(ctx: StateContext<StatsModel>, { exercise }: AddStats) {
    const { statsCollection } = ctx.getState();
    const { name, id, date, type, ...stats } = exercise;
    ctx.patchState({
      statsCollection: {
        ...statsCollection,
        [id]: {
          name,
          id,
          type,
          stats: [
            ...(statsCollection[id]?.stats || []),
            { ...stats, date: new Date() },
          ],
        },
      },
    });

    this.workoutService.nextExercise();
  }
  @Action(ClearStats)
  clearState(ctx: StateContext<StatsModel>) {
    ctx.patchState({ statsCollection: {} });
  }
}
