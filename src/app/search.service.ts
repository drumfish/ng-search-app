import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


import {Search} from './search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Comming from fake api in-memory-data.service.ts
  private apiUrl = 'api/searchList';

  constructor(private http: HttpClient) {
  }

  searchList(term: string): Observable<Search[]> {
    // If incoming term is empty return empty array
    if (!term.trim()) {
      return of([]);
    }

    const getTitle = this.http.get<Search[]>(`${this.apiUrl}/?title=${term}`)
      .pipe(catchError(this.handleError<Search[]>('searchList', [])));

    const getDescription = this.http.get<Search[]>(`${this.apiUrl}/?desc=${term}`)
      .pipe(catchError(this.handleError<Search[]>('searchList', [])));

    return forkJoin([getTitle, getDescription]).pipe(map(responses => {
      const joinedResults = [].concat(...responses);
      const set = new Set();

      // Check whether we got duplicates in response
      const filterDuplicates = joinedResults.filter(res => {
        const duplicate = set.has(res.id);
        set.add(res.id);
        return !duplicate;
      });

      return filterDuplicates;
    }));
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
