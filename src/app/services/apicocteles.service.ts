import { Injectable } from '@angular/core';

//imports importantes
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  //Se establece la base url del API a consumir, BodasAlrededor
  apiurl = 'https://apibodas-fb7d7-default-rtdb.firebaseio.com/apibodas/-NhSSwjag7FA_yVXP7jg/BodasAlrededor.json';
  apicocktail = 'https://apicocteles-default-rtdb.firebaseio.com/Cocktail.json';

  //Se declara la variable http de tipo HttpClient
  constructor(private http:HttpClient) { }

  //Conjunto de información sin filtrar
  getPosts(): Observable<any> {
    return this.http.get(this.apiurl).pipe(
      retry(3)
    );
  }
  
  getPostsCocktail(): Observable<any> {
    return this.http.get(this.apicocktail).pipe(
      retry(3)
    );
  }

  
}
