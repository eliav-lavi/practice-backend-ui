import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicSearchComponent } from './basic-search/basic-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleFlightResultComponent } from './single-flight-result/single-flight-result.component';
import { IntroComponent } from './intro/intro.component';
import { FlightSearchRoutingModule } from './flight-search-routing.module';
import { DataAccessComponent } from './data-access/data-access.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { RoundTripComponent } from './round-trip/round-trip.component';
import { FormsModule } from '@angular/forms';
import { TripResultComponent } from './trip-result/trip-result.component';
import { InstructionsComponent } from '../instructions/instructions.component';
import { ConnectingFlightsComponent } from './connecting-flights/connecting-flights.component';
import { ConnectingFlightsTripResultComponent } from './connecting-flights-trip-result/connecting-flights-trip-result.component';
import { FlightResultComponent } from './flight-result/flight-result.component';
import { TripPartResultComponent } from './trip-part-result/trip-part-result.component';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,

    FlightSearchRoutingModule
  ],
  declarations: [
    BasicSearchComponent,
    SingleFlightResultComponent,
    IntroComponent,
    DataAccessComponent,
    CitySearchComponent,
    RoundTripComponent,
    ConnectingFlightsComponent,
  
    TripResultComponent,
    // this is probably not right - consult
    InstructionsComponent,
    ConnectingFlightsTripResultComponent,
    FlightResultComponent,
    TripPartResultComponent,
    FiltersComponent
  ]
})
export class FlightSearchModule { }
