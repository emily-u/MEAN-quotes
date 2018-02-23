import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-all-authors',
  templateUrl: './all-authors.component.html',
  styleUrls: ['./all-authors.component.css']
})
export class AllAuthorsComponent implements OnInit {
  authors;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    
    this._httpService.getAuthors((res) => {
      this.authors = res;
    })
  }

  deleteButtonClicked(deleteId){
    console.log("deleted ID: ", deleteId);
    this._httpService.deleteTask(deleteId, (res) => {
      console.log("delete Task Button Clicked");
      this._httpService.getAuthors((res) => {
        this.authors = res;
      })
    })
  }

}
