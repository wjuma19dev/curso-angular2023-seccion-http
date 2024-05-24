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

const base_URL = 'https://curso-angular2023-post-default-rtdb.firebaseio.com/posts.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('postForm', { static: true }) postForm: NgForm;
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error: string = '';

  constructor(
    private http: HttpClient,
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.onFetchPosts();
    this.postService.error.subscribe(
      (error) => {
        this.error = error;
      }
    )
  }

  onCreatePost( postData: Post ): void {
    const { title, comment } = postData;
    if(title === '' || comment === '') {
      this.postService.error.next('Todos los campos son obligatorios.')
      return;
    }
    this.postService.createPost( title, comment );
    // console.log('Error value is: ', this.error)
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
        this.error = error.message;
      }
    )
  }

  onDeletePosts() {
    // if(this.loadedPosts.length < 1) {
    //   alert('No post data to delete');
    //   return;
    // }
    this.postService.deletePost().subscribe(
      () => {
        this.loadedPosts = [];
      }
    )
  }

  onHandlerError() {
    this.error = '';
  }

}
 