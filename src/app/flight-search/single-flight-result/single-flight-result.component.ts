import { Component, Input } from '@angular/core';
import { Flight } from '../models/flight'
import { Airport } from '../models/airport';

@Component({
  selector: 'app-single-flight-result',
  templateUrl: './single-flight-result.component.html',
  styleUrls: ['./single-flight-result.component.scss']
})
export class SingleFlightResultComponent {
  @Input() journey: Flight;
  @Input() originAirport: Airport;
  @Input() destinationAirport: Airport;

  getHours() {
    let localDepartureDatetime = this.journey.getLocalDepartureDatetime(this.originAirport.timezone);
    let localArrivalDatetime = this.journey.getLocalArrivalDatetime(this.destinationAirport.timezone);

    return new Date(+localArrivalDatetime - +localDepartureDatetime).getUTCHours()
  }

  getMinutes() {
    let localDepartureDatetime = this.journey.getLocalDepartureDatetime(this.originAirport.timezone);
    let localArrivalDatetime = this.journey.getLocalArrivalDatetime(this.destinationAirport.timezone);

    return new Date(+localArrivalDatetime - +localDepartureDatetime).getUTCMinutes()
  }
}
