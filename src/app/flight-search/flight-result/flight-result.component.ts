import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../models/flight';
import { Airport } from '../models/airport';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss']
})
export class FlightResultComponent {
  @Input() flight: Flight;
  @Input() airports: Airport[];

  originAirport(): Airport {
    return this.airports.find(airport => airport.iata == this.flight.origin);
  }

  destinationAirport(): Airport {
    return this.airports.find(airport => airport.iata == this.flight.destination);
  }
}
