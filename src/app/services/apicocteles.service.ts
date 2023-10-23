import { Injectable } from '@angular/core';

//imports importantes
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicoctelesService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }

  //Se establece la base url del API a consumir
  apiurl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';

  //Se declara la variable http de tipo HttpClient
  constructor(private http:HttpClient) { }

  //Conjunto de información sin filtrar
  getPosts() :Observable<any>{
    return this.http.get(this.apiurl+'/posts/').pipe(
      retry(3)
    );
  }
  
  
}
