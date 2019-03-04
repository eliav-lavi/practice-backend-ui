import { ChallengeRequest } from "./challenge-request";

export class CitySearchJourneyRequest extends ChallengeRequest {
  originCity: string;
  destinationCity: string;
  departureDate: Date;

  public constructor(originCity: string, destinationCity: string, departureDate: Date) {
    super();
    this.originCity = originCity;
    this.destinationCity = destinationCity;
    this.departureDate = departureDate;
  }
}
