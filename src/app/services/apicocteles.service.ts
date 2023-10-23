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
  apiurl = 'https://firebasestorage.googleapis.com/v0/b/lagna-login-registro.appspot.com/o/bodasAlrededor.json?alt=media&token=eba06f04-8241-449c-afe4-993724720bf7&_gl=1*cuxmgx*_ga*OTI2ODM5ODY0LjE2OTc3NTM3MTI.*_ga_CW55HF8NVT*MTY5ODAyODUyMy45LjEuMTY5ODAzMTU0My41Mi4wLjA';

  //Se declara la variable http de tipo HttpClient
  constructor(private http:HttpClient) { }

  //Conjunto de información sin filtrar
  getPosts() :Observable<any>{
    return this.http.get(this.apiurl+'/posts/').pipe(
      retry(3)
    );
  }
  
  
}
