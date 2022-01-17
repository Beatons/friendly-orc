import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Workout } from 'src/libs/interfaces/workout';
import { AddWorkout, DeleteWorkout, EditWorkout } from './workout.actions';

interface WorkoutStateModel {
  workoutList?: Workout[];
}

@State<WorkoutStateModel>({
  name: 'workout',
  defaults: {
    workoutList: [],
  },
})
export class WorkoutState {
  @Selector()
  static workoutList(state: WorkoutStateModel) {
    return state.workoutList;
  }
  @Action(AddWorkout)
  addWorkout(ctx: StateContext<WorkoutStateModel>, { workout }: AddWorkout) {
    const { workoutList } = ctx.getState();
    ctx.patchState({
      workoutList: [...workoutList, workout],
    });
  }
  @Action(DeleteWorkout)
  deleteWorkout(
    ctx: StateContext<WorkoutStateModel>,
    { workout }: DeleteWorkout
  ) {
    const { workoutList } = ctx.getState();
    ctx.patchState({
      workoutList: workoutList.filter(
        (listWorkout) => workout.id === workout.id
      ),
    });
  }
  @Action(EditWorkout)
  editWorkout(ctx: StateContext<WorkoutStateModel>, { workout }: EditWorkout) {
    const { workoutList } = ctx.getState();
    const editedWorkout = workoutList.find(
      (listWorkout) => listWorkout.id === workout.id
    );
    ctx.patchState({
      workoutList: [
        ...workoutList.filter((listWorkout) => listWorkout.id === workout.id),
        { ...editedWorkout, ...workout },
      ],
    });
  }
}
