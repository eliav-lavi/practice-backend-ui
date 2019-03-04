import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/internal/operators';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { BasicSearchJourneyRequest } from './models/basic-search-journey-request';
import { Flight } from './models/flight';
import { Airline } from "./models/airline";
import { Airport } from "./models/airport";
import { CitySearchJourneyRequest } from "./models/city-search-journey-request";
import { Trip } from './models/trip';
import { RoundTripJourneyRequest } from './models/round-trip-journey-request';
import { ConnectingFlightsTrip } from './models/connecting-flights-trip';
import { RoundTrip } from './models/round-trip';
import { FilterableRoundTripJourneyRequest } from './models/filterable-round-trip-journey-request';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})

export class FlightSearchService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private getWithParams<T>(path: string, params: { [key: string]: string } = {}, transFunc: (response: any) => T = response => response as T): Observable<T> {
    var fullPath = `${this.serverUrl()}${path}`

    // dynamically prepare an httpParams object from params
    var httpParams = new HttpParams();
    Object.keys(params).forEach(function (paramName) {
      httpParams = httpParams.append(paramName, params[paramName])
    });

    // send request to server and map response according to supplied transformation function
    this.messageService.info(`querying server at ${fullPath}`)
    return this.http.get<T>(fullPath, { params: httpParams, headers: this.httpHeaders }).pipe(
      tap(response => this.messageService.success(`${fullPath} responded successfully`)),
      catchError(this.handleError<T>(fullPath, []))
    ).map(response => transFunc(response));
  }

  private handleError<T>(path: string, result?: any) {
    return (error: any): Observable<T> => {
      this.messageService.error(`${path} returned ${error.status}: ${error.message}`)
      return of(result as T);
    };
  }

  getAirlines(): Observable<Airline[]> {
    return this.getWithParams<Airline[]>('/airlines')
  }

  getAirports(): Observable<Airport[]> {
    return this.getWithParams<Airport[]>('/airports')
  }

  searchJourney(request: BasicSearchJourneyRequest): Observable<Flight[]> {
    const transFunc = ((res: Object) => res['flights'].map((journey: Object) => new Flight(journey)));
    const params = request.asParams();
    return this.getWithParams<Flight[]>('/basic_search', params, transFunc);
  }

  citySearch(request: CitySearchJourneyRequest): Observable<Flight[]> {
    const transFunc = ((res: Object) => res['flights'].map((journey: Object) => new Flight(journey)));
    const params = request.asParams();
    return this.getWithParams<Flight[]>('/city_search', params, transFunc);
  }

  roundTrip(request: RoundTripJourneyRequest): Observable<RoundTrip[]> {
    const transFunc = ((res: Object) => res['trips'].map((trip: Object) => new RoundTrip(trip)));
    const params = request.asParams();
    return this.getWithParams<RoundTrip[]>('/round_trip', params, transFunc);
  }

  connectingFlights(request: RoundTripJourneyRequest): Observable<ConnectingFlightsTrip[]> {
    const transFunc = ((res: Object) => res['trips'].map((trip: Object) => new ConnectingFlightsTrip(trip)));
    const params = request.asParams();
    return this.getWithParams<ConnectingFlightsTrip[]>('/connecting_flights', params, transFunc);
  }

  filters(request: FilterableRoundTripJourneyRequest): Observable<ConnectingFlightsTrip[]> {
    const transFunc = ((res: Object) => res['trips'].map((trip: Object) => new ConnectingFlightsTrip(trip)));
    const params = request.asParams();
    return this.getWithParams<ConnectingFlightsTrip[]>('/filters', params, transFunc);
  }

  private serverUrl(): string {
    return localStorage.getItem('serverUrl');
  }
}
