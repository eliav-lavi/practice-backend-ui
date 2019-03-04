import {Component, Input, OnInit} from '@angular/core';
import {PathsService} from "../paths.service";
import {FormControl, FormGroup} from "@angular/forms";
import {PathConfiguration} from "../models/path-configuration";

import * as _ from "lodash";
import {NgbModal, NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-paths-configuration-modal',
  templateUrl: './paths-configuration-modal.component.html',
  styleUrls: ['./paths-configuration-modal.component.scss']
})
export class PathsConfigurationModalComponent implements OnInit {
  @Input() requiredPaths: PathConfiguration[];
  form: FormGroup;
  pathsService;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {
  };

  ngOnInit() {
    this.pathsService = PathsService;
    const formControls = _.chain(this.requiredPaths)
      .keyBy('pathName')
      .mapValues(value => new FormControl())
      .value();
    this.form = new FormGroup(formControls);
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit() {
    for (const pathName in this.form.value) {
      const suppliedPath = this.form.value[pathName];
      if (suppliedPath) { // TODO: weird stuff does around here? check out https://angular.io/guide/reactive-forms for more
        // also need to check path starts with a slash
        PathsService.setPath(pathName, suppliedPath);
        console.log('path: '+  pathName + ' supplied: ' + suppliedPath);
      }
    }
  }
}
