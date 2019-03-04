import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FlightSearchService} from "./flight-search.service";
import {BaseChallenge} from "../base-challenge";
import {topIatas} from "./documents/flight-search";
import {Airline} from "./models/airline";
import {Airport} from "./models/airport";
import {OnInit} from "@angular/core";
import {PathConfiguration} from "../models/path-configuration";
import * as _ from "lodash";
import { CollectionPaginatorService } from "../collection-paginator.service";
import { Flight } from "./models/flight";
import { Trip } from "./models/trip";

export abstract class BaseFlightSearchChallenge extends BaseChallenge implements OnInit {
  protected requiredPathNames: string[];

  public airlinesPath = '/airlines';
  public airportsPath = '/airports';
  public basicSearchPath = '/basic_search';
  public citySearchPath = '/city_search';
  public roundTripPath = '/round_trip';

  public airlinesPathName = 'airlinesPath';
  public airportsPathName = 'airportsPath';
  public basicSearchPathName = 'basicSearchPath';
  public citySearchPathName = 'citySearchPath';
  public roundTripPathName = 'roundTripPath';

  private allPathConfigurations: PathConfiguration[] = [
    new PathConfiguration({ pathName: this.airlinesPathName, label: 'Airlines Path', placeholder: "/airlines"}),
    new PathConfiguration({ pathName: this.airportsPathName, label: 'Airports Path', placeholder: "/airports"}),
    new PathConfiguration({ pathName: this.basicSearchPathName, label: 'Basic Search Path', placeholder: "/basic_search"}),
    new PathConfiguration({ pathName: this.citySearchPathName, label: 'City Search Path', placeholder: "/city_search"}),
    new PathConfiguration({ pathName: this.roundTripPathName, label: 'Round Trip Path', placeholder: "/round_trip"})
  ]; // TODO: this should be an enum (?)

  protected pathConfigurationsMap: {} = _.keyBy(this.allPathConfigurations, 'pathName');

  pathsService;

  public instructions;
  public challengeApis;

  public airports: Airport [] = [];
  public airlines: Airline [] = [];

  protected constructor(protected flightSearchService: FlightSearchService, protected modalService: NgbModal,
    protected collectionPaginatorService: CollectionPaginatorService) {
    super(modalService);
  }

  requiredPathConfigurations() {
    const requiredPathConfigurations = _.pick(this.pathConfigurationsMap, this.requiredPathNames);
    return _.values(requiredPathConfigurations);
  }

  getAirlines(): void {
    this.flightSearchService.getAirlines()
      .subscribe(airlines => this.airlines = airlines);
  }

  getAirports(): void {
    this.flightSearchService.getAirports()
      .subscribe(airports => this.airports = airports);
  }

  getIatas(): String [] {
    return this.airports.map(airport => airport.iata)
      .sort(function(a, b) {
        return (topIatas.includes(a) === topIatas.includes(b))? 0 : topIatas.includes(a) ? -1 : 1;
      });
  }

  getOriginAirportForFlight(flight: Flight): Airport {
    return this.airports.find(airport => airport.iata == flight.origin);
  }

  getDestinationAirportForFlight(flight: Flight): Airport {
    return this.airports.find(airport => airport.iata == flight.destination);
  }

  pickAirports(trip: Trip): Airport[] {
    return this.airports.filter(airport => trip.airportCodes().includes(airport.iata))
  }
}
