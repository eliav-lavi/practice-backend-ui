import { Component, OnInit, Input } from '@angular/core';
import { Trip } from '../models/trip';
import { Airport } from '../models/airport';

@Component({
  selector: 'app-connecting-flights-trip-result',
  templateUrl: './connecting-flights-trip-result.component.html',
  styleUrls: ['./connecting-flights-trip-result.component.scss']
})
export class ConnectingFlightsTripResultComponent {
  @Input() trip: Trip;
  @Input() airports: Airport[];
}
