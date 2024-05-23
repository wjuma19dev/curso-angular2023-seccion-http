import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, map } from "rxjs";
import { Post } from "../app.component";


let baseURL = 'https://curso-angular2023-post-default-rtdb.firebaseio.com/posts.json';

@Injectable()
export class PostService {

    constructor(
        private http: HttpClient
    ) {
        console.log('PostService')
    }

    createPost(title: string, comment: string) {
        const data = { title, comment, createAt: Date.now() } 
        this.http.post<{ name: string }>(
            baseURL,
            data
        ).subscribe(
            (responseData) => console.log(responseData)
        )
    }

    fetchPosts(): Observable<Post[]> {
        return this.http.get<{ [key: string]: Post }>(baseURL)
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
        );
    }

    deletePost(): Observable<any> {
        return this.http.delete(baseURL);
    }
}