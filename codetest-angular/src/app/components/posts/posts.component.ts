import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.postsUpdated.subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  public addComment(event: any, postId: number) {
    const postContent: string = event.target.value;
    this.postsService.addComment(postId, postContent);
    event.target.value = '';
  }

}
