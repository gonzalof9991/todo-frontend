// Create filter pipe to array of objects
import { Pipe, PipeTransform } from '@angular/core';
import {ITask} from "../components/task/task.interface";

@Pipe({
  name: 'filterArray',
  pure: false,
})
export class FilterPipe implements PipeTransform {

transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    return items.filter(singleItem =>
      singleItem[field].toLowerCase().includes(value.toLowerCase())
    );
  }
}
