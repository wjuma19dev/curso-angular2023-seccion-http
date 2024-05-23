import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PostService } from './services/post.service';

export interface Post {
  title: string;
  comment: string;
  id?: string;
  createAt: Date;
}

const base_URL = 'https://curso-angular2023-post-default-rtdb.firebaseio.com/posts.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(
    private http: HttpClient,
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.onFetchPosts();
  }

  onCreatePost( postData: Post ): void {
    const { title, comment } = postData;
    this.postService.createPost( title, comment );
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
          this.isFetching = false;
          this.loadedPosts = posts;
      }
    )
  }

  onDeletePosts() {
    this.postService.deletePost().subscribe(
      () => {
        this.loadedPosts = [];
      }
    )
  }

}
 