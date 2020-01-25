import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.scss']
})
export class NewPostDialogComponent implements OnInit {
  @Output() dialogClosed = new EventEmitter<boolean>();

  constructor(private postsService: PostsService) { }

  ngOnInit() {
  }

  addPost($event) {
    const postContent = $event.target.value;
    if (postContent) {
      this.postsService.addPost(postContent);
    }
    this.dialogClosed.emit(true);
  }

}
