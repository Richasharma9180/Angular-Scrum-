import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostComponent } from '../post/post.component';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postList: []

  constructor(private service: PostService, private dialog: MatDialog, public notificationService: NotificationService) { }

  ngOnInit(): void {
    this.service.getAllPosts()
      .subscribe(
        res => this.postList = res,
        err => console.log(err)
      )
  }

  onCreate() {
    this.service.initializeFormGroup()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(PostComponent, dialogConfig)
  }

  // Method to delete a enquiry
  delete($key) {
    console.log("working")
    this.service.deletePost($key).subscribe(res => {
      this.postList.splice($key, 1);
      this.notificationService.success(':: Deleted Successfully');
    });
  }

}
