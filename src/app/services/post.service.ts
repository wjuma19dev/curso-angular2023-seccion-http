import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, Subject, Subscriber, catchError, map, tap } from "rxjs";
import { Post } from "../app.component";


let baseURL = 'https://curso-angular2023-post-default-rtdb.firebaseio.com/posts.json';

@Injectable()
export class PostService {

    error = new Subject<string>();
    loadPosts = new Subject();

    constructor(
        private http: HttpClient
    ) {}

    createPost(title: string, comment: string) {
        const data = { title, comment, createAt: Date.now() } 
        this.http.post<{ name: string }>(
            baseURL,
            data,
            // TODO: See more about response data from a server
            {
                observe: 'response'
            }
        )
        .pipe(
            catchError(error => {
                this.error.next(error.message);
                return error;
            })
        )
        .subscribe(
            (responseData) => {
                this.loadPosts.next(data);
                // console.log(responseData) // Show here observer
            }
        )
    }

    fetchPosts(): Observable<Post[]> {

        let optionsParam = new HttpParams();
        optionsParam = optionsParam.append('id', 1);
        optionsParam = optionsParam.append('edit', true)

        return this.http.get<{ [key: string]: Post }>(baseURL, {
            headers: new HttpHeaders({
                "Custom-Header": "Hello"
            }),
            // params: new HttpParams().set('gretting', "hello word")
            params: optionsParam
        })
        .pipe(
        // Mapping response data to converte into a valid array
        map((responseData) => {
                const postArray: Post[] = [];
                for( const key in responseData ) {
                    if(responseData.hasOwnProperty(key)) {
                        postArray.push({ ...responseData[key], id: key });
                    }
                }
                return postArray;
            })
        );
    }

    deletePost(): Observable<any> {
        return this.http.delete(baseURL, {
            observe: 'events',
            responseType: 'json'
        })
            .pipe(
                catchError(error => {
                    this.error.next(error.message);
                    return error;
                }),
                tap(event => {
                    if(event.type === HttpEventType.Sent) {
                        console.log(event)
                    }
                    if(event.type === HttpEventType.Response) {

                        console.log(event.body)
                    }
                })
            );
    }
}