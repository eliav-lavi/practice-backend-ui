import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {
  @Input() instructions: object;
  @Input() apis: object;

  private modalService: NgbModal;

  constructor(modalService: NgbModal) {
    this.modalService = modalService
  }

  ngOnInit(): void { }

  public instructionsIsCollapsed: boolean = false;

  toggleInstructionsIsCollapsed(): void {
    this.instructionsIsCollapsed = !this.instructionsIsCollapsed;
  }

  openModalLarge(content): void {
    this.modalService.open(content, {size: 'lg'}).result;
    return;
  }
}
