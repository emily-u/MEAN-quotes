import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class HttpService {
    constructor(private _http: HttpClient){}

    addAuthor(newAuthor, callback){
        console.log("7777", newAuthor);
        this._http.post("/authors", newAuthor).subscribe(
            (res) => {
                callback(res);
            }
        )
    }

    addQuote(authorId, newQuote, callback){
        console.log("6667",newQuote);
        this._http.put("/write/" + authorId, newQuote).subscribe(
            (res) => {
                callback(res);
            }
        )
    }

    getAuthors(callback) {
       
        this._http.get("/authors").subscribe(
          (res) => {
            callback(res);
          })
        }

    getAuthorById(authorId, callback){
        this._http.get("author/" + authorId).subscribe(
            (res) => {
                callback(res);
            }
        )
    }

    deleteTask(deleteId, callback){
        this._http.delete('/authors/' + deleteId, {}).subscribe((resFromServer) => {
          callback(resFromServer);
        })
    }

    deleteQuote(authorId, quoteIndex, callback){
        console.log(authorId);
        this._http.delete('/quote/' + authorId + "/" + quoteIndex).subscribe((resFromServer) => {
            callback(resFromServer);
          });
    }

    editAuthor(editId, edit_content, callback){
        console.log(editId);
        this._http.put('/authors/' + editId, edit_content).subscribe((resFromServer) => {
          callback(resFromServer);
        })
    }

    updateAuthor(newAuth) {
        let pStr = "/authors/" + newAuth['id']
        console.log("str: ", pStr)
        return this._http.put(pStr, newAuth);
      }

    voteUp(id, index, boolean, callback){
        this._http.put('/vote/' + id + "/" + index, {bool: boolean}).subscribe((resFromServer) => {
            callback(resFromServer);
          })

    }

  

}