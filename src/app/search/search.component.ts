import { Component, OnInit } from '@angular/core';
import {SearchService} from '../search.service';
import {Search} from '../search';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults: Observable<Search[]>;
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {}

  // Push a search term into the observable stream.
  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.searchResults = this.searchTerms.pipe(
      // wait 500ms after each key pressed
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.searchList(term)),
    );
  }
}
