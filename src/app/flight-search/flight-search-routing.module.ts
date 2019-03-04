import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { BasicSearchComponent } from './basic-search/basic-search.component';
import { DataAccessComponent } from './data-access/data-access.component';
import { IntroComponent } from './intro/intro.component';
import { CitySearchComponent } from './city-search/city-search.component';
import { RoundTripComponent } from './round-trip/round-trip.component';
import { ConnectingFlightsComponent } from './connecting-flights/connecting-flights.component';
import { FiltersComponent } from './filters/filters.component';

const flightSearchRoutes: Routes = [
  // { path: '', redirectTo: '/intro', pathMatch: 'full' },
  {
    path: 'flight-search', children: [
      { path: 'intro', component: IntroComponent },
      { path: 'data-access', component: DataAccessComponent },
      { path: 'basic-search', component: BasicSearchComponent },
      { path: 'city-search', component: CitySearchComponent },
      { path: 'round-trip', component: RoundTripComponent },
      { path: 'connecting-flights', component: ConnectingFlightsComponent },
      { path: 'filters', component: FiltersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(flightSearchRoutes)],
  exports: [RouterModule]
})
export class FlightSearchRoutingModule { }
