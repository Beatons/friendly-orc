import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutNowPage } from './workout-now.page';
import { SharedModule } from 'src/app/core/shared.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: WorkoutNowPage,
  },
  {
    path: 'working-out/:id',
    loadChildren: () =>
      import('./working-out/working-out.module').then(
        (m) => m.WorkingOutPageModule
      ),
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [WorkoutNowPage],
})
export class WorkoutNowPageModule {}
