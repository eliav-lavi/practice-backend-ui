import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { FlightSearchService } from "../flight-search.service";
import { Observable, Subject } from "rxjs/Rx";
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { merge } from 'rxjs'
import { filter } from "rxjs/internal/operators";

import * as _ from "lodash";

import { instructions, challengesApis } from "../documents/flight-search"

import { BaseFlightSearchChallenge } from "../base-flight-search-challenge";
import { CollectionPaginatorService } from '../../collection-paginator.service';
import { Trip } from '../models/trip';
import { FilterEntry } from '../models/filter-entry';
import { FilterableRoundTripJourneyRequest } from '../models/filterable-round-trip-journey-request';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent extends BaseFlightSearchChallenge implements OnInit {
  public trips: Trip[];

  public tripsPage: number = 1;
  public pageSize: number = 5;

  public maxPriceFilter = new FilterEntry<number>("maxPrice");
  public departAfterFilter = new FilterEntry<number>("departAfter");
  public landBeforeFilter = new FilterEntry<number>("landBefore");
  public directFlightsOnlyFilter = new FilterEntry<boolean>("directFlightsOnly");
  private filtersSet = [this.maxPriceFilter, this.departAfterFilter, this.landBeforeFilter, this.directFlightsOnlyFilter]

  public instructionsIsCollapsed: boolean = false;

  public maxPriceCollapsed: boolean = true
  public departureTimesCollapsed: boolean = true
  public arrivalTimesCollapsed: boolean = true
  public tripTypesCollapsed: boolean = true

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(protected flightSearchService: FlightSearchService, protected modalService: NgbModal,
    protected collectionPaginatorService: CollectionPaginatorService) {
    super(flightSearchService, modalService, collectionPaginatorService);
    this.directFlightsOnlyFilter.value = false;
    this.directFlightsOnlyFilter.enabled = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.instructions = instructions.filters;
    this.challengeApis = challengesApis.filters;

    this.getAirlines();
    this.getAirports();
  }

  search(originCity: string, destinationCity: string, departureDate: string, returnDate: string): void {
    const filters = this.filtersSet.filter(f => f.enabled);
    this.tripsPage = 1;
    const journeyRequest: FilterableRoundTripJourneyRequest = new FilterableRoundTripJourneyRequest(originCity, destinationCity, new Date(departureDate), new Date(returnDate), filters);

    this.flightSearchService.filters(journeyRequest).subscribe(trips => this.trips = trips);
  }

  getCities(): String[] {
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


  toggleMaxPrice(): void {
    if(this.maxPriceFilter.enabled) {
      this.maxPriceCollapsed = !this.maxPriceCollapsed;
    }
    this.departureTimesCollapsed = true;
    this.arrivalTimesCollapsed = true;
    
    return;
  }

  toggleDepartureTimes(): void {
    if(this.departAfterFilter.enabled) {
      this.departureTimesCollapsed = !this.departureTimesCollapsed;
    }
    this.maxPriceCollapsed = true;
    this.arrivalTimesCollapsed = true;
    
    return;
  }

  toggleArrivalTimes(): void {
    if(this.landBeforeFilter.enabled) {
      this.arrivalTimesCollapsed = !this.arrivalTimesCollapsed;
    }
    this.maxPriceCollapsed = true;
    this.departureTimesCollapsed = true;
    
    return;
  }
}
