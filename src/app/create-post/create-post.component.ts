import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import {Post} from '../models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('postForm', {static: false}) public postForm: NgForm;
  createPostForm;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  createForm() {
    this.createPostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      body: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.createForm();
  }

  showDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      height: '200px'
    });
    setTimeout(() => {
      dialogRef.close();
    }, 10000);
  }

  onSubmit() {
    if (this.createPostForm.invalid) {
      return;
    }

    const id = +this.route.snapshot.paramMap.get('id');
    const data = {
      title : this.createPostForm.value.title,
      body: this.createPostForm.value.body,
      userId: id
    };

    this.usersService
      .createPost( data )
      .subscribe(
        (res: Post) => {
          this.showDialog();
          this.usersService.addPost(res);
        }
      );
  }
}
