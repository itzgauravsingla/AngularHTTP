import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
    error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string) {
    const postData: Post = {title, content};  
    return this.http
      .post<{ name: string }>(
        'https://angularhttp-225d2-default-rtdb.firebaseio.com/posts.json',
        postData
      )
   }

  fetchPosts() {
    // this.isFetching = true;
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angularhttp-225d2-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map(
          (postData: {
            [key: string]: Post /* {content: string; title: string;} */;
          }) => {
            const postArray: Post[] = [];
            for (const key in postData) {
              if (postData.hasOwnProperty(key)) {
                postArray.push({ ...postData[key], id: key });
              }
            }
            return postArray;
          }
        )
      )
  }

  deletePosts(){
      return this.http.delete('https://angularhttp-225d2-default-rtdb.firebaseio.com/posts.json');

  }
}
