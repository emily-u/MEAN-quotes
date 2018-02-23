import { AddAuthorsComponent } from './add-authors/add-authors.component';
import { AllAuthorsComponent } from './all-authors/all-authors.component';
import { EditAuthorsComponent } from './edit-authors/edit-authors.component';
import { AllquotesComponent } from './allquotes/allquotes.component';
import { AddquoteComponent } from './addquote/addquote.component';
import { EditquoteComponent } from './editquote/editquote.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [

  { path: 'new',component: AddAuthorsComponent },
  { path: '',component: AllAuthorsComponent },
  { path: 'edit/:id/:authorname',component: EditAuthorsComponent },
  { path: 'quotes/:id',component: AllquotesComponent },
  { path: 'write/:id',component: AddquoteComponent },
  

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { AllAuthorsComponent } from './all-authors/all-authors.component';
// import { HttpService } from './http.service';
// import { AppComponent } from './app.component';

// const routes: Routes = [
//   {path: "", component: AppComponent},
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
