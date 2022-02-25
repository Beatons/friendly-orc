import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
];

@NgModule({
  declarations: [SettingsPage],
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
  exports: [],
  providers: [],
})
export class SettingsPageModule {}
