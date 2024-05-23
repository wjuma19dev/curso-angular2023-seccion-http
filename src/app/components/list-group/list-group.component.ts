import { Component, Input } from '@angular/core';
import { Post } from '../../app.component';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html'
})
export class ListGroupComponent {

  @Input() loadedPosts: Post[];

}
