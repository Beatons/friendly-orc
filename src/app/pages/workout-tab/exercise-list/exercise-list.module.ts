import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseListPage } from './exercise-list.page';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ExerciseListPage,
  },
];

@NgModule({
  declarations: [ExerciseListPage],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ExerciseListModule {}
