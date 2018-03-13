import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../domain-model/event';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(events: Event[], searchText: string): any[] {
    if(!events) return [];
    if(!searchText) return events;

    return events.filter( it => {
      return it.eventTitle.includes(searchText)
      || it.city.includes(searchText)
      || it.state.includes(searchText);
    });
  }

}
