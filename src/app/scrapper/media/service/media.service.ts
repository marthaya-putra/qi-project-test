import { Injectable, Inject } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Media } from './media';
import { SearchTerm } from '../../search.term';
import { IAuthenticationService, AuthenticationService } from '../../../authentication/service';
import { SearchTermServiceFactory, SearchTermService} from '../../search.term';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class MediaService {

    private authService:AuthenticationService;

    constructor(private jsonp:Jsonp,
                @Inject(IAuthenticationService) authService:AuthenticationService,
                private searchTermFactory:SearchTermServiceFactory) {
        this.authService = authService;
    }

    public getData(filter:string, term:SearchTerm):Observable<Media[]> {
        let url = `https://api.instagram.com/v1/${filter}/${term.term}/media/recent?access_token=${this.authService.getToken()}&count=10&callback=JSONP_CALLBACK`;

        // have to use jsonp instead of http to get around CORS :(
        return this.jsonp.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getSearchTerms(filter:string, term:string):Observable<SearchTerm[]> {
        // this probably too much, just wanna try it out
        let searchTermService: SearchTermService = this.searchTermFactory.getService(filter);
        return searchTermService.getTerms(term);
    }

    private extractData(response:Response):Media[] {
        let medias:Media[] = [];
        let data = response.json().data;

        for (let item of data) {
            let title:string = item.user.username;
            let objectUrl:string = item.link;
            let thumbnailUrl:string = item.images.thumbnail.url;
            let description:string = item.caption ? item.caption.text : '';

            medias.push(new Media(title, objectUrl, thumbnailUrl, description));
        }
        return medias;
    }

    private handleError(error:any) {
        console.error('An friendly error occurred', error);
        return Observable.throw(error.message || error);
    }
}