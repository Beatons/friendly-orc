import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWorkoutPage } from './add-workout.page';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AddWorkoutPage,
  },
];

@NgModule({
  declarations: [AddWorkoutPage],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class AddWorkoutModule {}
