import { Workout } from 'src/libs/interfaces/workout';

export class AddWorkout {
    static type = '[Workout] AddWorkout';
    constructor(public workout: Workout) {}
}

export class DeleteWorkout {
    static type = '[Workout] DeleteWorkout';
    constructor(public workout: Workout) {}
}

export class EditWorkout {
    static type = '[Workout] EditWorkout';
    constructor(public workout: Workout) {}
}
