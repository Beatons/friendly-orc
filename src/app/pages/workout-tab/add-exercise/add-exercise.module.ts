import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExercisePage } from './add-exercise.page';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AddExercisePage,
  },
];

@NgModule({
  declarations: [AddExercisePage],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class AddExerciseModule {}
