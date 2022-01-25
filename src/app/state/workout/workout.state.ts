import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { Exercise, Workout } from 'src/libs/interfaces/workout';
import {
  AddExercise,
  AddWorkout,
  DeleteExercise,
  DeleteWorkout,
  EditExercise,
  EditWorkout,
} from './workout.actions';

interface WorkoutStateModel {
  workoutList?: Workout[];
  exerciseList?: Exercise[];
}

@State<WorkoutStateModel>({
  name: 'workout',
  defaults: {
    workoutList: [],
    exerciseList: [],
  },
})
export class WorkoutState {
  @Selector()
  static workoutList(state: WorkoutStateModel) {
    return state.workoutList;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  static workoutById(id: string) {
    return createSelector([WorkoutState.workoutList], (list) =>
      list.find((workout) => workout.id === id)
    );
  }
  @Selector()
  static exerciseList(state: WorkoutStateModel) {
    return state.exerciseList;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  static exerciseById(id: string) {
    return createSelector([WorkoutState.exerciseList], (list) =>
      list.find((exercise) => exercise.id === id)
    );
  }

  @Action(AddWorkout)
  addWorkout(ctx: StateContext<WorkoutStateModel>, { workout }: AddWorkout) {
    const { workoutList } = ctx.getState();
    ctx.patchState({
      workoutList: [...workoutList, workout],
    });
  }
  @Action(DeleteWorkout)
  deleteWorkout(ctx: StateContext<WorkoutStateModel>, { id }: DeleteWorkout) {
    const { workoutList } = ctx.getState();
    ctx.patchState({
      workoutList: workoutList.filter((listWorkout) => listWorkout.id !== id),
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
        ...workoutList.filter((listWorkout) => listWorkout.id !== workout.id),
        { ...editedWorkout, ...workout },
      ],
    });
  }
  @Action(AddExercise)
  addExercise(ctx: StateContext<WorkoutStateModel>, { exercise }: AddExercise) {
    const { exerciseList } = ctx.getState();
    ctx.patchState({
      exerciseList: [...exerciseList, exercise],
    });
  }
  @Action(DeleteExercise)
  deleteExercise(ctx: StateContext<WorkoutStateModel>, { id }: DeleteExercise) {
    const { exerciseList } = ctx.getState();
    ctx.patchState({
      exerciseList: exerciseList.filter(
        (listExercise) => listExercise.id !== id
      ),
    });
  }
  @Action(EditExercise)
  editExercise(
    ctx: StateContext<WorkoutStateModel>,
    { exercise }: EditExercise
  ) {
    const { exerciseList } = ctx.getState();
    const editedExercise = exerciseList.find(
      (listExercise) => listExercise.id === exercise.id
    );
    ctx.patchState({
      exerciseList: [
        ...exerciseList.filter(
          (listExercise) => listExercise.id !== exercise.id
        ),
        { ...editedExercise, ...exercise },
      ],
    });
  }
}
