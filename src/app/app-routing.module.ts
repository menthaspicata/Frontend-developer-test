import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent} from './details/details.component';
import { UsersComponent } from './users/users.component';
import {CreatePostComponent} from './create-post/create-post.component';

const routes: Routes = [
  { path: '', component: UsersComponent},
  { path: 'details/:id', component: DetailsComponent },
  { path: 'create-post-for-user/:id', component: CreatePostComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
