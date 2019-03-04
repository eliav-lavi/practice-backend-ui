import { Flight } from "./flight";
import { TripPart } from "./trip-part";

// export class Trip {
//   outboundFlight: Flight;
//   returnFlight: Flight;
//   price: number;
  
//   public constructor(json) {
//     this.outboundFlight = new Flight(json['outboundFlight'])
//     this.returnFlight = new Flight(json['returnFlight'])
//     this.price = json['price'];
//   }
// }

export abstract class Trip {
  tripParts;
  price: number;

  public airportCodes(): string[] {
    return this.tripParts.flatMap(tripPart => tripPart.flights.flatMap(flight => [flight.origin, flight.destination]));
  };
}