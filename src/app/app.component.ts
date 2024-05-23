import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

interface Post {
  title: string;
  comment: string;
  id?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts: Post[] = [];

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.fetchPosts();
  }

  onCreatePost( postData: Post ): void {
    this.http.post<{ name: string }>(
      'https://angularcompleteguide2023-default-rtdb.firebaseio.com/posts.json',
      postData
    ).subscribe(
      (responseData) => console.log(responseData)
    )
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<{ [key: string]: Post }>('https://angularcompleteguide2023-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      // Mapping response data to converte into a valid array
      map((responseData) => {
        const postArray: Post[] = [];
        for( const key in responseData ) {
          if(responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key })
          }
        }
        return postArray;
      })
    )
    .subscribe(
      (posts) => {
        this.loadedPosts = posts;
      }
    )
  }

}
 