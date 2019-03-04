import { Component, Input } from '@angular/core';
import { Trip } from '../models/trip';
import { Airport } from '../models/airport';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-trip-result',
  templateUrl: './trip-result.component.html',
  styleUrls: ['./trip-result.component.scss']
})
export class TripResultComponent{
  @Input() trip: Trip;
  @Input() airports: Airport[];
}
