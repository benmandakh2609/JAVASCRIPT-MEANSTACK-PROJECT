import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { NewReviewComponent } from './new-review/new-review.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new', component: NewComponent },
  { path: 'show/:id', component: ShowComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'newReview/:id', component: NewReviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
