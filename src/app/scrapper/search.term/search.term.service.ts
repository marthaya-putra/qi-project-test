import { OpaqueToken } from '@angular/core';
import { SearchTerm } from './search.term';
import { Observable } from 'rxjs/Observable';

export interface SearchTermService {
    getTerms(value: string): Observable<SearchTerm[]>;
}

export let ISearchTermService = new OpaqueToken('ISearchTermService');