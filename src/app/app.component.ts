import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { PostService } from './services/post.service';
import { NgForm } from '@angular/forms';

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

  @ViewChild('postForm', { static: true }) postForm: NgForm;
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  errors: HttpErrorResponse = null;

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
    this.postForm.resetForm();
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      (posts) => {
          this.isFetching = false;
          this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.errors = error;
        console.log(error)
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
 