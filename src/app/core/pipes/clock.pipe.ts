import { Pipe, PipeTransform } from '@angular/core';
import { zeroPad } from 'src/libs/functions/common';

@Pipe({ name: 'clock' })
export class ClockPipe implements PipeTransform {
  transform(value: number | string): string {
    const num = Number(value);
    const minutes = Math.floor(num / 60);

    return `${zeroPad(minutes)}:${zeroPad(num - minutes * 60)}`;
  }
}
