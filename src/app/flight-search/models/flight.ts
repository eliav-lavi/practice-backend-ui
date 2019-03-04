import * as moment from 'moment-timezone';
import { Moment } from 'moment';

export class Flight {
  origin: string;
  destination: string;
  departureDatetime: Moment;
  arrivalDatetime: Moment;
  flightNum: string;
  uniqueCarrier: string;
  price: number;

  public constructor(json) {
    this.origin = json['origin'];
    this.destination = json['destination'];
    this.departureDatetime = moment(json['departureDatetime']);
    this.arrivalDatetime = moment(json['arrivalDatetime']);
    this.flightNum = json['flightNum'];
    this.uniqueCarrier = json['uniqueCarrier'];
    this.price = json['price'];
  }

  public getHours(): number {
    return new Date(+this.arrivalDatetime - +this.departureDatetime).getUTCHours()
  }

  public getMinutes(): number {
    return new Date(+this.arrivalDatetime - +this.departureDatetime).getUTCMinutes()
  }

  public getLocalArrivalDatetime(timezone: string) {
    return this.arrivalDatetime.tz(timezone);
  }

  public getLocalDepartureDatetime(timezone: string) {
    return this.departureDatetime.tz(timezone);
  }
}
