import { Pipe, PipeTransform } from '@angular/core';

import { Event } from './event';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(events: Event[], searchText: string): any[] {
    if(!events) return [];
    if(!searchText) return events;

    return events.filter( it => {
      return it.eventName.includes(searchText)
      || it.eventLocCity.includes(searchText)
      || it.eventLocState.includes(searchText);
    });
  }

}
