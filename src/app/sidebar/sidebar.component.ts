import { Component, OnInit } from '@angular/core';
import { TerminalNavigationElement } from './navigation-elements/terminal-navigation-element';
import { ParentNavigationElement } from './navigation-elements/parent-navigation-element';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{
  navigationTree = [
    new TerminalNavigationElement('Welcome', '/welcome'),
    new ParentNavigationElement('Todo App',
      [
        new TerminalNavigationElement('Intro', ''),
        new TerminalNavigationElement('Hello, World', ''),
        new TerminalNavigationElement('Create', '')
      ]
    ),
    new ParentNavigationElement('Flight Search',
      [
        new TerminalNavigationElement('Intro', '/flight-search/intro'),
        new TerminalNavigationElement('Data Access', '/flight-search/data-access'),
        new TerminalNavigationElement('Basic Search', '/flight-search/basic-search'),
        new TerminalNavigationElement('City Search', '/flight-search/city-search'),
        new TerminalNavigationElement('Round Trip', '/flight-search/round-trip'),
        new TerminalNavigationElement('Connecting Flights', '/flight-search/connecting-flights'),
        new TerminalNavigationElement('Filters', '/flight-search/filters')
      ]
    ),
    new TerminalNavigationElement('Contact', '')
  ];

  serverUrl: string;
  serverUrlName: string = 'serverUrl';

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.serverUrl = localStorage.getItem(this.serverUrlName);
  }

  openModal(content: any): void {
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
