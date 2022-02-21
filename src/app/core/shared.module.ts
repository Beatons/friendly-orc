import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClockPipe } from './pipes/clock.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ClockPipe],
  imports: [CommonModule, FlexLayoutModule],
  exports: [CommonModule, ClockPipe, FlexLayoutModule],
  providers: [],
})
export class SharedModule {}
