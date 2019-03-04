import { FilterEntry } from "./filter-entry";
import * as _ from "lodash";
import { ChallengeRequest } from "./challenge-request";

export class FilterableRoundTripJourneyRequest extends ChallengeRequest {
  originCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;
  filters: FilterEntry<any>[];

  public constructor(originCity: string, destinationCity: string, departureDate: Date, returnDate: Date, filters: FilterEntry<any>[]) {
    super();
    this.originCity = originCity;
    this.destinationCity = destinationCity;
    this.departureDate = departureDate;
    this.returnDate = returnDate;
    this.filters = filters;
  }

  public asParams() {
    var params = {
      originCity: this.originCity,
      destinationCity: this.destinationCity,
      departureDate: this.departureDate,
      returnDate: this.returnDate
    }

    this.filters.forEach(function (filterEntry) {
      params[filterEntry.filterName] = filterEntry.value;
    });

    return _.mapValues(params, v => String(v));
  }
}
