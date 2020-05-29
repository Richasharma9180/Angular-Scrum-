import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/shared/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postList = []

  constructor(public service: PostService, 
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<PostComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(value: Post) {
    if(this.service.form.valid) {
      this.service.addPost(value).subscribe(res => { 
        this.service.getAllPosts()
      .subscribe(
        res => this.postList = res,
        err => console.log(err)
      )
      });
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted Successfully');
      this.onClose()
    }
  }


  onClick() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Cleared Successfully');
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
