import { ChallengeRequest } from "./challenge-request";

export class BasicSearchJourneyRequest extends ChallengeRequest {
  origin: string;
  destination: string;
  departureDate: Date;

  public constructor(origin: string, destination: string, departureDate: Date) {
    super();
    this.origin = origin;
    this.destination = destination;
    this.departureDate = departureDate;
  }
}
