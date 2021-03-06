import {Component, OnInit} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {Search} from '../../models/search';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults: Observable<Search[]>;
  animateInput: boolean;
  showLoader: boolean;
  private searchTerms = new Subject<string>();

  constructor(private searchService: SearchService) {}

  // Push a search term into the observable stream.
  search(term: string) {
    this.searchTerms.next(term);
    this.animateInput = term !== '';
    this.showLoader = true;
  }

  public highlight(term: string, query: any) {
    return term.replace(new RegExp(query, 'gi'), match => {
      return '<span class="highlight_text">' + match + '</span>';
    });
  }

  ngOnInit() {
    this.searchResults = this.searchTerms.pipe(
      // wait 500ms after each key pressed
      debounceTime(500),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.searchList(term)),
      tap(() => this.showLoader = false)
    );
  }

  setClasses() {
    return {
      animated: this.animateInput
    };
  }

  showEmptyResult() {
    return {
      hide: !this.animateInput
    };
  }
}
