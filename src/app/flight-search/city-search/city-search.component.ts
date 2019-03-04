import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

import {CitySearchJourneyRequest} from "../models/city-search-journey-request";
import {Flight} from '../models/flight'
import {FlightSearchService} from "../flight-search.service";
import {Observable, Subject} from "rxjs/Rx";
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {merge} from 'rxjs'
import {filter} from "rxjs/internal/operators";

import * as _ from "lodash";

import {BaseFlightSearchChallenge} from "../base-flight-search-challenge";
import { CollectionPaginatorService } from '../../collection-paginator.service';

import { instructions, challengesApis } from "../documents/flight-search"

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent extends BaseFlightSearchChallenge implements OnInit {
  public requiredPathNames: string[] = [this.citySearchPathName, this.airlinesPathName, this.airportsPathName];
  public journeys: Flight [];

  public journeysPage: number = 1;
  public pageSize: number = 5;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(protected flightSearchService: FlightSearchService, protected modalService: NgbModal,
    protected collectionPaginatorService: CollectionPaginatorService) {
    super(flightSearchService, modalService, collectionPaginatorService);
  }

  ngOnInit(): void {
    super.ngOnInit();


    this.instructions = instructions.citySearch;
    this.challengeApis = challengesApis.citySearch;

    this.getAirlines();
    this.getAirports();
  }

  search(originCity: string, destinationCity: string, departureDate: string): void {
    this.journeysPage = 1;
    const journeyRequest: CitySearchJourneyRequest = new CitySearchJourneyRequest(originCity,destinationCity, new Date(departureDate)
    );
    this.flightSearchService.citySearch(journeyRequest).subscribe(journeys => this.journeys = journeys);
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

  getPageJourneys(): Flight[] {
    return this.collectionPaginatorService.getPageItems(this.journeys, this.journeysPage, this.pageSize);
  }
}
