import { Flight } from "./flight";
import * as _ from "lodash";
import { Trip } from "./trip";
import { TripPart } from "./trip-part";

export class ConnectingFlightsTrip extends Trip {
  outboundFlights: Flight[];
  returnFlights: Flight[];
  price: number;
  
  public constructor(json) {
    super();
    this.tripParts = [
      new TripPart(json['outboundFlights']),
      new TripPart(json['returnFlights'])
  ];
    this.price = json['price'];
  }
}
