import { Trip } from "./trip";
import { TripPart } from "./trip-part";

export class RoundTrip extends Trip {
    tripParts: TripPart[];
    price: number;

    public constructor(json) {
        super();
        this.tripParts = [
            new TripPart([json['outboundFlight']]),
            new TripPart([json['returnFlight']])
        ];
        this.price = json['price'];
    }
}