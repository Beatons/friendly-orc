import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.page.html',
  styleUrls: ['./add-exercise.page.scss'],
})
export class AddExercisePage implements OnInit {
  exerciseGroup = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
    calories: new FormControl(),
    distance: new FormControl(),
    reps: new FormControl(),
    sets: new FormControl(),
    minutes: new FormControl(),
    seconds: new FormControl(),
  });

  constructor() {}

  ngOnInit(): void {}
  submit() {}
}
