import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { User } from '../models/user.interface';
import { Comment } from '../models/comment.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts: Post[];

  constructor(private http: HttpClient) {
    this.loadUsers().subscribe((users: User[]) => {
      this.loadPosts().subscribe((posts: Post[]) => {
        // add author data into posts & comments
        posts.forEach((post: Post) => {
          const author: User = users.find(user => user.id === post.userId);
          post.username = author.username;
          post.pic = `assets/${author.pic}`;

          post.comments.forEach((comment: Comment) => {
            const commentAuthor: User = users.find(user => user.id === comment.userId);
            comment.username = commentAuthor.username;
            comment.pic = `assets/${commentAuthor.pic}`;
          })
        });
  
        this.posts = posts;
      });
    });
  }

  private loadPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('assets/data/posts.json');
  }

  private loadUsers(): Observable<User[]> {
    return this.http.get<User[]>('assets/data/users.json');
  }

  public getPosts(): Post[] {
    return this.posts;
  }
}
