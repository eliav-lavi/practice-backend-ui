import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { BasicSearchJourneyRequest } from '../models/basic-search-journey-request';
import { Flight } from '../models/flight'
import { FlightSearchService } from "../flight-search.service";
import { Observable, Subject } from "rxjs/Rx";
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { merge } from 'rxjs'
import { filter } from "rxjs/internal/operators";

import { BaseFlightSearchChallenge } from "../base-flight-search-challenge";

import * as _ from "lodash";
import { CollectionPaginatorService } from "../../collection-paginator.service"

import { instructions, challengesApis } from "../documents/flight-search"

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.scss']
})

export class BasicSearchComponent extends BaseFlightSearchChallenge implements OnInit {
  protected requiredPathNames: string[] = [this.basicSearchPathName, this.airlinesPathName, this.airportsPathName];

  public journeys: Flight[];

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


    this.instructions = instructions.basicSearch;
    this.challengeApis = challengesApis.basicSearch;

    this.getAirlines();
    this.getAirports();
  }

  search(origin: string, destination: string, departureDate: string): void {
    this.journeysPage = 1;
    const journeyRequest: BasicSearchJourneyRequest = new BasicSearchJourneyRequest(origin, destination, new Date(departureDate))
    this.flightSearchService.searchJourney(journeyRequest).subscribe(journeys => this.journeys = journeys);
  }

  browseAirports = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getIatas()
        : this.getIatas().filter(iata => iata.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
      ));
  };

  getPageJourneys(): Flight[] {
    return this.collectionPaginatorService.getPageItems(this.journeys, this.journeysPage, this.pageSize);
  }
}
