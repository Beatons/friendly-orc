export type ExerciseGoal = 'distance' | 'time' | 'reps' | 'calories';

export const SECONDS_IN_MINUTE = 60;

export interface Exercise {
  id: string;
  name: string;
  type: ExerciseGoal;
  distance?: number;
  calories?: number;
  reps?: number;
  sets?: number;
  seconds?: number;
  weight?: number;
  date: Date;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface ExerciseStats {
  id: string;
  name: string;
  type: string;
  date: Date;
  stats: {
    distance?: number;
    calories?: number;
    reps?: number;
    sets?: number;
    seconds?: number;
    weight?: number;
  }[];
}
