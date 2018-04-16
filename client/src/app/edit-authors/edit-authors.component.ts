import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-authors',
  templateUrl: './edit-authors.component.html',
  styleUrls: ['./edit-authors.component.css']
})
export class EditAuthorsComponent implements OnInit {
  editAuthor = {
    name: "",
    author: ""
  };
  name: String;
  error;


  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) {
    
  }

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      console.log("2323",params);
      this.editAuthor.name= params.get("authorname");
    })
    console.log("edit name: ", this.editAuthor.name);
  }
  

  editSubmit(){
    this._route.paramMap.subscribe(params => {
      
      this._httpService.editAuthor(params.get("id"), this.editAuthor, (resFromService) => {
        console.log(resFromService);
        if (resFromService.name == "ValidationError") {
          this.error = resFromService.message;
        }else{
          this._router.navigate(["/"]);
        }
        
      }); 
    })
  }



}
