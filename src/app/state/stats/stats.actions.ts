import { Exercise } from '../../../libs/interfaces/workout';

export class AddStats {
  static readonly type = '[Stats] AddStats';
  constructor(public readonly exercise: Exercise) {}
}

export class ClearStats {
  static readonly type = '[Stats] ClearStats';
}
