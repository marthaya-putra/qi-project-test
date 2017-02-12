import { Injectable, Inject, Injector } from '@angular/core';
import { Jsonp } from '@angular/http';
import { SearchTermService } from './search.term.service';
import { TagSearchService } from './tag';
import { UserSearchService } from './user';
import { AuthenticationService, IAuthenticationService } from '../../authentication/service';

@Injectable()
export class SearchTermServiceFactory {

    // unnecessary, just wanna try explicit injector call
    constructor(private injector:Injector) {
    }

    public getService(searchTerm:string):SearchTermService {
        let authService: AuthenticationService = this.injector.get(IAuthenticationService);
        let jsonp:Jsonp = this.injector.get(Jsonp);

        if (searchTerm === 'tags') {
            return new TagSearchService(authService, jsonp);
        }

        return new UserSearchService(authService, jsonp);
    }
}