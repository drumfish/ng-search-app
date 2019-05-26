import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import {Search} from './search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private heroesUrl = 'api/searchList';  // URL to web api

  constructor(private http: HttpClient) {}


  getSearchList(): Observable<Search[]> {
    return this.http.get<Search[]>(this.heroesUrl).pipe(
      catchError(this.handleError<Search[]>('getHeroes', []))
    );
  }

  searchList(term: string): Observable<Search[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Search[]>(`${this.heroesUrl}/?title=${term}`)
        .pipe(catchError(this.handleError<Search[]>('searchList', [])))
      &&
      this.http.get<Search[]>(`${this.heroesUrl}/?desc=${term}`)
        .pipe(catchError(this.handleError<Search[]>('searchList', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed passed from the api call
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
