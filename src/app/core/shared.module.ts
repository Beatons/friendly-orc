import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockPipe } from './pipes/clock.pipe';

@NgModule({
  declarations: [ClockPipe],
  imports: [CommonModule],
  exports: [CommonModule, ClockPipe],
  providers: [],
})
export class SharedModule {}
