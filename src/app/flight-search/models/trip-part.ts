import { Flight } from "./flight";
import * as _ from "lodash";

export class TripPart {
  flights: Flight[]

  public constructor(flights) {
    this.flights = flights.map(flight => new Flight(flight));
  }
}