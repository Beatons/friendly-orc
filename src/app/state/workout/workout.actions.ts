import { Exercise, Workout } from 'src/libs/interfaces/workout';

export class AddWorkout {
  static type = '[Workout] AddWorkout';
  constructor(public readonly workout: Workout) {}
}

export class DeleteWorkout {
  static type = '[Workout] DeleteWorkout';
  constructor(public readonly id: Workout['id']) {}
}

export class EditWorkout {
  static type = '[Workout] EditWorkout';
  constructor(public readonly workout: Workout) {}
}
export class AddExercise {
  static type = '[Exercise] AddExercise';
  constructor(public readonly exercise: Exercise) {}
}

export class DeleteExercise {
  static type = '[Exercise] DeleteExercise';
  constructor(public readonly id: Exercise['id']) {}
}

export class EditExercise {
  static type = '[Exercise] EditExercise';
  constructor(public readonly exercise: Exercise) {}
}
