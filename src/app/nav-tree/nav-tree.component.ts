import { Component, Input } from '@angular/core';
import { NavigationElement } from '../sidebar/navigation-elements/navigation-element';

@Component({
  selector: 'app-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.scss']
})
export class NavTreeComponent {
  @Input() treeData: NavigationElement[];

  activeNode: NavigationElement;

  handleClick(node: NavigationElement): void {
    if(this.activeNode == node) {
      this.activeNode = null;
    } else {
      this.activeNode = node;
    }
  }
}
