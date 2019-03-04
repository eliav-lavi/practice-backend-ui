import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

import {FlightSearchService} from "../flight-search.service";
import {Observable, Subject} from "rxjs/Rx";
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {merge} from 'rxjs'
import {filter} from "rxjs/internal/operators";

import * as _ from "lodash";

import { instructions, challengesApis } from "../documents/flight-search"

import {BaseFlightSearchChallenge} from "../base-flight-search-challenge";
import { CollectionPaginatorService } from '../../collection-paginator.service';
import { RoundTripJourneyRequest } from '../models/round-trip-journey-request';
import { Trip } from '../models/trip';


@Component({
  selector: 'app-connecting-flights',
  templateUrl: './connecting-flights.component.html',
  styleUrls: ['./connecting-flights.component.scss']
})

export class ConnectingFlightsComponent extends BaseFlightSearchChallenge implements OnInit {
  public trips: Trip[];

  public tripsPage: number = 1;
  public pageSize: number = 5;


  public instructionsIsCollapsed: boolean = false;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(protected flightSearchService: FlightSearchService, protected modalService: NgbModal,
    protected collectionPaginatorService: CollectionPaginatorService) {
    super(flightSearchService, modalService, collectionPaginatorService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.instructions = instructions.connectingFlights;
    this.challengeApis = challengesApis.connectingFlights;

    this.getAirlines();
    this.getAirports();
  }

  search(originCity: string, destinationCity: string, departureDate: string, returnDate: string): void {
    this.tripsPage = 1;
    const journeyRequest: RoundTripJourneyRequest = new RoundTripJourneyRequest(originCity, destinationCity, new Date(departureDate), new Date(returnDate));

    this.flightSearchService.connectingFlights(journeyRequest).subscribe(trips => this.trips = trips);
  }

  getCities(): String [] {
    return _.uniq(this.airports.map(airport => airport.city));
  }

  browseCities = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getCities()
        : this.getCities().filter(city => city.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
      ));
  };

  getPageTrips(): Trip[] {
    return this.collectionPaginatorService.getPageItems(this.trips, this.tripsPage, this.pageSize);
  }

  toggleInstructionsIsCollapsed(): void {
    this.instructionsIsCollapsed = !this.instructionsIsCollapsed;
  }
}
