import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkingOutPage } from './working-out.page';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared.module';

const routes = [
  {
    path: '',
    component: WorkingOutPage,
  },
];

@NgModule({
  declarations: [WorkingOutPage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [],
})
export class WorkingOutPageModule {}
