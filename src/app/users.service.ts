import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './models/user.model';
import { Post } from './models/post.model';
import {map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serviceUrl = 'https://jsonplaceholder.typicode.com/';
  post$;
  post;

  constructor(private http: HttpClient) { }

  public getUsersList(): Observable<User[]> {
    const url = `${this.serviceUrl}users/`;
    return this.http.get<User[]>(url);
  }

  getUserById( id: number ): Observable<User> {
    const url = `${this.serviceUrl}users/${id}`;
    return this.http.get<User>(url);
  }

  getPosts(userId) {
    if (this.post) {
      return of(this.post);
    } else if (this.post$) {
      return this.post$;
    } else {
      return this.getUserPostsById(userId);
    }
  }

  getUserPostsById(userId: number) {
    const url = `${this.serviceUrl}users/${userId}/posts`;

    this.post$ = this.http
      .get<any>(url, {
        observe: 'response'
      })
      .pipe(
        map(response => {
          console.log(response);
          this.post$ = null;
          if (response.status === 500 || response.status === 400) {
            return 'Request failed.';
          } else if (response.status === 200) {
            this.post = response.body;
            console.log(this.post);
            return this.post;
          }
        }),
        share()
      );

    return this.post$;
  }

  addPost(post: Post) {
    if (this.post) {
      post.commentsCount = 0;
      this.post.push(post);
    }
  }

  getPostComments( postId: number ): Observable<Comment[]> {
    const url = `${this.serviceUrl}posts/${postId}/comments`;
    return this.http.get<Comment[]>(url);
  }

  createPost( data: object ): Observable<object> {
    const url = `${this.serviceUrl}posts/`;
    return this.http.post(url, data);
  }
}
