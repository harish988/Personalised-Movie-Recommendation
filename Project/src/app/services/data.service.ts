import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../Models/user.model';
import {  Headers, Http, Response } from '@angular/http';
import { Observable , throwError} from 'rxjs';
import { HttpClient, HttpHeaders , HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {map, catchError } from 'rxjs/operators';
import { UserFile } from '../../Models/file.model';
import { Movie } from 'src/models/movie.model';
@Injectable()
export class DataService {

    constructor(private http: HttpClient ) {}


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }

      getResult() {
        return this.http.get('http://localhost:3000/api/excel/result');
      }

      putFile(file: UserFile, id: String) {
     //   console.log(file);
      //  console.log(id);
        const body = JSON.stringify(file);
        console.log('Body');
        console.log(body);
        //   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
        const httpOptions = {
           headers: new HttpHeaders({
             'Content-Type':  'application/json'
           })
         };
        return this.http.post('http://localhost:3000/api/user/putfile/' + id, body, httpOptions)
        .pipe(catchError(this.handleError));
      }

      getid(email: String ) {
        return this.http.get('http://localhost:3000/api/user/getid/' + email);
      }

      writeReview(str: String) {
          return this.http.get('http://localhost:3000/api/py/writeReview/' + str);
      }

      getUser(email: string) {
        return this.http.get('http://localhost:3000/api/user/values/' + email);
      }

      getmovies() {
          return this.http.get('http://localhost:3000/api/user/getmovies');
      }

      insertMovie(name: string, genre: string) {

        const movie = new Movie('', name, genre);
        const body = JSON.stringify(movie);
        console.log('Body');
        console.log(body);
        //   const httpheader = new HttpHeaders({'Content-Type': 'application/json'});
        const httpOptions = {
           headers: new HttpHeaders({
             'Content-Type':  'application/json'
           })
         };
        return this.http.post('http://localhost:3000/api/user/insertMovie', body, httpOptions);
      }
}
