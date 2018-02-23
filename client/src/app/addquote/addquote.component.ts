import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-addquote',
  templateUrl: './addquote.component.html',
  styleUrls: ['./addquote.component.css']
})
export class AddquoteComponent implements OnInit {
  authors = {
    id:"",
    name:"",
    quotes:""
  };
  name: String;
 
  id: String;
  quotes = [];
  quote = {
    text: "",
    votes: 0,
    star: Number
  };

  

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      // console.log("add quote author id here: ", params.get("id"));
      this.id= params.get("id");
    
    })

    this._httpService.getAuthorById(this.id, (res) => {
      this.authors = res;
      // console.log("add quote component, get thisAuthor name", this.authors.name)  
    })
  }

  addQuoteSubmit(){
    
    console.log("addQuoteSubmit button pressed, pass: ",this.quote);
    this._httpService.addQuote(this.id, this.quote, (res) =>{
      console.log(res);
      this._router.navigate(["/quotes", this.id]);
    });
  }
  

}
