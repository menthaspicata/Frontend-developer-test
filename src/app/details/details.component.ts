import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../users.service';
import {User} from '../models/user.model';
import {Post} from '../models/post.model';
import {Comment} from '../models/comment.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  user: User;
  post: Post[];
  comment: Comment[];

  public postsColumns: string[] = ['id', 'title', 'commentsCount', 'body', ];
  public postsArray = [];
  public commentsLoaded = false;
  public commentsArray;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getUserPosts();
  }

  getUserDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usersService
      .getUserById(id)
      .subscribe((res) => {
        this.user = res;
      });
  }

  getUserPosts(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usersService
      .getPosts(id)
      .subscribe(
        (res) => {
          console.log(res);
          this.postsArray = res.filter((post) => {
            return post.userId === id;
          });
          this.getComments();
        });
  }

  getComments(): void {
    const id = this.postsArray[0].userId;
    this.usersService
      .getPostComments(id)
      .subscribe(
        (comments: any) => {
          this.postsArray.forEach((post) => {
            this.commentsArray = comments.filter((comment) => {
              return comment.postId === post.id;
            });
            post.commentsCount = this.commentsArray.length;
          });
          this.commentsLoaded = true;
        });
  }
}
