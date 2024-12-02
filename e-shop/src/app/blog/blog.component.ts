import {Component, inject} from '@angular/core';
import {Comment, CommentService} from '../services/CommentService';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentService.getComments()
      .subscribe(comments => {
        for (let comment of comments) {
          this.comments.push(comment);
        }
         // console.log(comments)
    });
  }

}
