import { Component, OnInit, Input } from '@angular/core';
import { TripPart } from '../models/trip-part';
import { Airport } from '../models/airport';

@Component({
  selector: 'app-trip-part-result',
  templateUrl: './trip-part-result.component.html',
  styleUrls: ['./trip-part-result.component.scss'],
  host: {
    "[style.display]": "'block'"
  }
})
export class TripPartResultComponent {
  @Input() tripPart: TripPart;
  @Input() airports: Airport[];

  public inspect() {
    return 'bla';
  }
}
