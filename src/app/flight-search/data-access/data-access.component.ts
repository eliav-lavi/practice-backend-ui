import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FlightSearchService} from "../flight-search.service";
import {Airport} from "../models/airport";
import {Airline} from "../models/airline";
import {BaseFlightSearchChallenge} from "../base-flight-search-challenge";
import { CollectionPaginatorService } from "../../collection-paginator.service" 

import { instructions, challengesApis } from "../documents/flight-search"


@Component({
  selector: 'app-data-access',
  templateUrl: './data-access.component.html',
  styleUrls: ['./data-access.component.scss']
})

export class DataAccessComponent extends BaseFlightSearchChallenge implements OnInit {
  public airportsPage: number = 1;
  public airlinesPage: number = 1;
  public pageSize: number = 5;

  constructor(protected flightSearchService: FlightSearchService, protected modalService: NgbModal,
    protected collectionPaginatorService: CollectionPaginatorService) {
    super(flightSearchService, modalService, collectionPaginatorService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.instructions = instructions.dataAccess;
    this.challengeApis = challengesApis.dataAccess;
  }

  getPageAirports(): Airport[] {
    return this.collectionPaginatorService.getPageItems(this.airports, this.airportsPage, this.pageSize);
  }

  getPageAirlines(): Airline[] {
    return this.collectionPaginatorService.getPageItems(this.airlines, this.airlinesPage, this.pageSize);
  }
}
