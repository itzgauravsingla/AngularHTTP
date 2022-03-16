import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[]= [];
  isFetching: boolean = false;
  error = null;
  errorSubscription : Subscription;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    
    this.isFetching = true;
    this.postService.fetchPosts()
    .subscribe({
      next: (postData) => {
        this.isFetching = false;
        this.loadedPosts = postData;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    });
    // this.errorSubscription = this.postService.error.subscribe(errorMessage => {
    //   this.error = errorMessage;
    //   console.log(errorMessage);
    // });

  }

  onCreatePost(postData: Post /* { title: string, content: string; } */) {
    // Send Http request
    this.postService.createAndStorePosts(postData.title, postData.content)
    .subscribe({
      next: () => {
        this.onFetchPosts();
      },
      error: (error) => {
        this.postService.error.next(error.message);
      }
    });
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts()
    .subscribe({
      next: (postData) => {
        this.isFetching = false;
        this.loadedPosts = postData;
      },
      error: (error) => {
        this.error = error.message;
      }
    });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts()
    .subscribe(() => {
      this.isFetching = true;
      this.postService.fetchPosts()
      .subscribe( (postData) => {
        this.isFetching = false;
        this.loadedPosts = postData;
      });
    });
  }

  // private fetchPosts() {
    
  // }

  onErrorHandled(){
    this.error = null;
  }


  ngOnDestroy(): void {
      this.errorSubscription.unsubscribe();
  }
}
