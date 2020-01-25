import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { User } from '../models/user.interface';
import { Comment } from '../models/comment.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public postsUpdated: EventEmitter<Post[]> = new EventEmitter();
  private posts: Post[];

  constructor(private http: HttpClient) {
    // nested foreach and nested subscribes not ideal, but didn't want to dig in too deep to rxjs right now
    // could also use a .map instead
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
        this.postsUpdated.emit(this.posts);
      });
    });
  }

  public addComment(postId: number, postContent: string): void {
    const post: Post = this.posts.find(post => post.id === postId);
    // hardcoding author username/id/pic for now
    // in a real app we might call some UserService to get this info
    post.comments.push({
      postId,
      id: 100,
      userId: 5,
      username: 'Daniel Craig',
      pic: 'assets/images/profile/daniel-craig.jpg',
      date: '',
      content: postContent
    });

    this.postsUpdated.emit(this.posts);
  }

  private loadPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('assets/data/posts.json');
  }

  private loadUsers(): Observable<User[]> {
    return this.http.get<User[]>('assets/data/users.json');
  }
}
