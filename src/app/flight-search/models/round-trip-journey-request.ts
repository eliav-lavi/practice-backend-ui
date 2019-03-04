import { ChallengeRequest } from "./challenge-request";

export class RoundTripJourneyRequest extends ChallengeRequest {
  originCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;

  public constructor(originCity: string, destinationCity: string, departureDate: Date, returnDate: Date) {
    super();
    this.originCity = originCity;
    this.destinationCity = destinationCity;
    this.departureDate = departureDate;
    this.returnDate = returnDate;
  }
}
