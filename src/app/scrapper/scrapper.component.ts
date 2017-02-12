import { Component, OnInit, Inject } from '@angular/core';
import { AppState } from '../app.service';
import { Media } from './media/service';
import { MediaContainerComponent } from './media';
import { IAuthenticationService, AuthenticationService } from '../authentication/service';
import { MediaService } from './media/service';
import { SearchTermService } from './search.term';
import { TagSearchService } from './search.term/tag';
import { UserSearchService } from './search.term/user';
import { SearchTermServiceFactory } from './search.term';
import { SearchTerm } from './search.term';
import { DragulaService } from 'ng2-dragula';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'scrapper',
    styleUrls: ['../../../node_modules/dragula/dist/dragula.css', './scrapper.component.css'],
    templateUrl: './scrapper.component.html',
    providers: [
        MediaService,
        SearchTermServiceFactory,
        TagSearchService,
        UserSearchService
    ]
})
export class ScrapperComponent implements OnInit {

    private authService:AuthenticationService;
    public filters = ['tags', 'users'];
    public selectedFilter:string = '';
    public searchText:string = '';
    public medias:Array<Media> = [];
    public selectedMedias:Array<Media> = [];
    public errorMessage:any;
    public typeAheadModel:any;

    constructor(private appState:AppState,
                @Inject(IAuthenticationService)authService:AuthenticationService,
                public service:MediaService,
                private dragulaService:DragulaService) {

        this.authService = authService;
        this.selectedFilter = this.filters[0];
        this.dragulaService.setOptions('media-bag', {
            copy: true,
            revertOnSpill: true
        });
    }

    ngOnInit() {
        if (!this.appState.get('isAuthenticated')) {
            this.authService.authenticate();
        }
    }

    public search():void {
        this.service.getData(this.selectedFilter, this.typeAheadModel)
            .subscribe(
                medias => this.medias = medias,
                error =>  this.errorMessage = <any>error
        );
    }


    public findTerm = (text$:Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .switchMap(term => term
                ? this.service.getSearchTerms(this.selectedFilter, term)
                : Observable.of<SearchTerm[]>([]))
            .catch(error => {
                this.errorMessage = <any>error;
                return Observable.of<SearchTerm[]>([]);
            });

    public formatter = (x:{name: string}) => x.name;

}
