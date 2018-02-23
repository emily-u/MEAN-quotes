import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AllAuthorsComponent } from './all-authors/all-authors.component';
import { AddAuthorsComponent } from './add-authors/add-authors.component';
import { EditAuthorsComponent } from './edit-authors/edit-authors.component';
import { FormsModule } from '@angular/forms';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { AllquotesComponent } from './allquotes/allquotes.component';
import { EditquoteComponent } from './editquote/editquote.component';
import { AddquoteComponent } from './addquote/addquote.component';

@NgModule({
  declarations: [
    AppComponent,
    AllAuthorsComponent,
    AddAuthorsComponent,
    EditAuthorsComponent,
    AllquotesComponent,
    EditquoteComponent,
    AddquoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
