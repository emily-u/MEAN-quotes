import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-allquotes',
  templateUrl: './allquotes.component.html',
  styleUrls: ['./allquotes.component.css']
})
export class AllquotesComponent implements OnInit {

  id: String;
  authors = {
    id:"",
    name:"",
    quotes:""
  };
  quotes;


  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      // console.log("id here: ", params.get("id"));
      this.id= params.get("id");
    })
    


    this._httpService.getAuthorById(this.id, (res) => {
      this.authors = res;
      console.log(this.authors);
      // console.log("bbbb", this.authors.name)  
    })
  }

  deleteQuoteClicked(index){
    this._httpService.deleteQuote(this.id, index,(res) => {
      console.log("delete quote Button Clicked");
      this._httpService.getAuthorById(this.id, (res) => {
        this.authors = res;
        // console.log("bbbb", this.authors.name)  
      })
    })
  }

  vote(quoteIndex, boolean){
      this._httpService.voteUp(this.id, quoteIndex, boolean, (res) => {
        this._httpService.getAuthorById(this.id, (res) => {
          this.authors = res;
          console.log(this.authors);
          // console.log("bbbb", this.authors.name)  
        })
      })
  }

}
