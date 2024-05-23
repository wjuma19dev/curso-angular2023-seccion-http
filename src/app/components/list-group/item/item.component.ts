import { Component, Input } from '@angular/core';
import { Post } from '../../../app.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent {

  @Input() post: Post;

}
