import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-add-authors',
  templateUrl: './add-authors.component.html',
  styleUrls: ['./add-authors.component.css']
})
export class AddAuthorsComponent implements OnInit {
  newAuthor = {
    name: ""
  }
  error;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    
  }

  addSubmit(){
    this._httpService.addAuthor(this.newAuthor, (resFromService) => {
      // console.log("add task submitted", resFromService.error.message);
      if(resFromService.message == "Error") {
        this.error = resFromService.error.message;
      }
      else {
        this.newAuthor = {
          name: ""
        }
        this._router.navigate(["/"]);
      }
    }); 
  }

}
