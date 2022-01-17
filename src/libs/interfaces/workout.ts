export interface Workout {
  id?: number;
  list?: Excercise[];
  name?: string;
}

export interface Excercise {
  id: number;
  reps: number;
  sets: number;
  name: string;
  weight: number;
}
