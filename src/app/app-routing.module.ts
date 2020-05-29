import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostEditComponent } from './posts/post-edit/post-edit.component';


const routes: Routes = [
  {
    path: 'post-edit/:id',
    component: PostEditComponent,
    data: { title: 'Edit Product' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
