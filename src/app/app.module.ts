import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule }          from '@angular/forms';

import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule }    from '@angular/common/http';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt, faPlane ,faPlaneDeparture, faPlaneArrival, faCaretRight, faCaretDown, faPaperPlane, faPassport, faPauseCircle, faTrashAlt, faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { PathsConfigurationModalComponent } from './paths-configuration-modal/paths-configuration-modal.component';

import { FlightSearchModule } from './flight-search/flight-search.module';
import { MessagesComponent } from './messages/messages.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavTreeComponent } from './nav-tree/nav-tree.component';

library.add(faCalendarAlt, faPlane, faPlaneDeparture, faPlaneArrival, faCaretRight, faCaretDown, faPaperPlane, faPassport, faPauseCircle, faTrashAlt, faPlayCircle);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PathsConfigurationModalComponent,
    MessagesComponent,
    SidebarComponent,
    NavTreeComponent
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlightSearchModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
  entryComponents: [PathsConfigurationModalComponent]
})
export class AppModule { }
