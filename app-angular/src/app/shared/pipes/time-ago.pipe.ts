import { Pipe, PipeTransform } from '@angular/core';
import { timeAgo } from '../utils/common.utils';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';
    return timeAgo(value);
  }
}
