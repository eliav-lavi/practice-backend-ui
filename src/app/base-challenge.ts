import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PathsConfigurationModalComponent} from "./paths-configuration-modal/paths-configuration-modal.component";
import {OnInit} from "@angular/core";
import {PathsService} from "./paths.service";
import * as _ from "lodash";

export abstract class BaseChallenge implements OnInit {
  pathsService;

  protected constructor(protected modalService: NgbModal) { }

  ngOnInit() {
    this.pathsService = PathsService;
  }

  arePathsDefined(pathNames): boolean {
    return _.every(pathNames, pathName => this.pathsService.isPathDefined(pathName));
  };

  openPathsModal(requiredPaths): void {
    const modalRef = this.modalService.open(PathsConfigurationModalComponent);
    modalRef.componentInstance.requiredPaths = requiredPaths;
  }

  openModal(content): void {
    this.modalService.open(content).result;
    return;
  }

  openModalLarge(content): void {
    this.modalService.open(content, {size: 'lg'}).result;
    return;
  }
}
