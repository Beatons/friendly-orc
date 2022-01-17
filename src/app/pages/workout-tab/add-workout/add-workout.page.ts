import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.page.html',
  styleUrls: ['./add-workout.page.scss'],
})
export class AddWorkoutPage implements OnInit {
  constructor(private nav: NavController) {}

  ngOnInit(): void {}

  addExercise() {
    this.nav.navigateForward(['/', 'tabs', 'workout-tab', 'add-exercise']);
  }
}
