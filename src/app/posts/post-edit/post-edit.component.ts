import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';




@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  
  editForm: FormGroup;
  _id:string='';
  title:string;
  description:string;
  isLoadingResults = false

  private _allPosts = "https://jsonplaceholder.typicode.com/posts";


  constructor(private http: HttpClient,private service: PostService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.getTask(this.route.snapshot.params['id']);
    this.editForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'description' : [null, Validators.required]
    
    });
  }
  
  
  getTask(id) {
    this.service.getTask(id).subscribe(data => {
     this._id = data.id;
      this.editForm.setValue({
        title: data.title,
        description: data.description,
       
      });
    });
  }


  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.service.updateTask(this._id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/post-list', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }





}