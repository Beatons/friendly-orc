import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/core/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExerciseResultPage } from './exercise-result.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ExerciseResultPage,
  },
];

@NgModule({
  declarations: [ExerciseResultPage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [],
})
export class ExerciseResultModule {}
