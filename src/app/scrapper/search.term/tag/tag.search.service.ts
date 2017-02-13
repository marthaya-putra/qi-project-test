import { Injectable, Inject } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { SearchTermService } from '../search.term.service';
import { SearchTerm } from '../search.term';
import { IAuthenticationService, AuthenticationService } from '../../../authentication/service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class TagSearchService implements SearchTermService {

    private authService:AuthenticationService;

    constructor(@Inject(IAuthenticationService)authService:AuthenticationService,
                private jsonp:Jsonp) {
        this.authService = authService;
    }

    public getTerms(value:string):Observable<SearchTerm[]> {
        let url = `https://api.instagram.com/v1/tags/search?q=${value}&access_token=${this.authService.getToken()}&count=10&callback=JSONP_CALLBACK`;

        return this.jsonp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(response:Response):SearchTerm[] {
        let searchTerms:SearchTerm[] = [];
        let data = response.json().data;

        for (let item of data) {
            searchTerms.push(new SearchTerm(item.name, item.name));
        }

        return searchTerms;
    }

    private handleError(error:any) {
        console.error('Error occurred', error);
        return Observable.throw(error.message || error);
    }
}