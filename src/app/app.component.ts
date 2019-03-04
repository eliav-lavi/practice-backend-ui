import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'practice_backend';
  serverUrl: string;
  serverUrlName: string = 'serverUrl';

  todoAppCollapsed: boolean;
  flightSearchCollapsed: boolean;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.todoAppCollapsed = true;
    this.flightSearchCollapsed = true;

    this.serverUrl = localStorage.getItem(this.serverUrlName);
  }

  openModal(content): void {
    this.modalService.open(content).result;
    return;
  }

  serverConfigured(): boolean {
    return localStorage.getItem(this.serverUrlName) !== null;
  }

  configureServer(serverUrl: string): void {
    localStorage.setItem(this.serverUrlName, serverUrl);
    this.serverUrl = serverUrl;
  }
}
