import { Component, OnInit } from '@angular/core';

import * as SVG from 'svg.js';

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css']
})
export class EventMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var imagePath = '../../assets/SampleMap.png';

    var draw = SVG('drawing');
    draw.size(1000, 1000);

    var image = draw.image(imagePath);
    image.size(1000, 1000);
    image.id('mapImage');
    image.attr({'class': 'unselectable', 'draggable': false});
  }

}
