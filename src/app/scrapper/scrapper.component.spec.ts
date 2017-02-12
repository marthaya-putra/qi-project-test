import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { ScrapperComponent } from './scrapper.component';
import { Router } from '@angular/router';
import { AppState } from '../app.service';
import { Media } from './media/service';
import { MediaContainerComponent } from './media';
import { MediaService } from './media/service';
import { SearchTermService } from './search.term';
import { TagSearchService } from './search.term/tag';
import { UserSearchService } from './search.term/user';
import { IAuthenticationService } from '../authentication/service';
import { SearchTermServiceFactory } from './search.term';
import { SearchTerm } from './search.term';
import { DragulaService } from 'ng2-dragula';
import { ElipsisDirective } from './elipsis';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Scrapper Component', () => {

    let comp:ScrapperComponent;
    let fixture:ComponentFixture<ScrapperComponent>;
    let de:DebugElement;
    let appState:AppState;
    let authService:any;
    let filterSelectEl:HTMLElement;
    let searchInputEl:HTMLElement;
    let searchButtonEl:HTMLElement;
    let medias:Media[] = [
        new Media('Title 1', 'http://object1Url', 'http://thumbnail1Url', 'description 1'),
        new Media('Title 2', 'http://object2Url', 'http://thumbnail2Url', 'description 2')
    ];

    beforeEach(async(()=> {
        TestBed.configureTestingModule({
            imports: [FormsModule, DragulaModule, NgbModule.forRoot(), BrowserModule, HttpModule, JsonpModule],
            declarations: [ScrapperComponent, MediaContainerComponent, ElipsisDirective],
            providers: [
                {
                    provide: IAuthenticationService,
                    useClass: AuthServiceStub
                },
                {
                    provide: DragulaService,
                    useClass: DragulaServiceStub
                },
                AppState,
                MediaService,
                TagSearchService,
                UserSearchService,
                SearchTermServiceFactory
            ]
        })
            .compileComponents();
    }));

    beforeEach(()=> {
        fixture = TestBed.createComponent(ScrapperComponent);
        comp = fixture.componentInstance;
        appState = TestBed.get(AppState);
        authService = TestBed.get(IAuthenticationService);
        de = fixture.debugElement;

        filterSelectEl = de.query(By.css('.filter-select')).nativeElement;
        searchInputEl = de.query(By.css('.search-input')).nativeElement;
        searchButtonEl = de.query(By.css('.search-button')).nativeElement;

    });

    it('should call AuthenticationService.authenticate', () => {
        let spy = spyOn(authService, 'authenticate');
        appState.set('isAuthenticated', false);

        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    });

    it('should set default state of the variables', () => {

        let dragulaService = de.injector.get(DragulaService);
        let options:any = dragulaService.getOptions();
        fixture.detectChanges();

        expect(comp.selectedFilter).toEqual('tags', 'not tags');
        expect(filterSelectEl.textContent).toContain('tags', 'does not contain tags');
        expect(options['media-bag'].copy).toEqual(true, 'copy is false');
        expect(options['media-bag'].revertOnSpill).toEqual(true, 'revert is false');
        expect(options['media-bag'].accepts).toBeDefined('accepts() is not defined');
    });

    it('should call mediaService#getData and populate medias when search button is clicked', () => {
        let mediaService:MediaService = de.injector.get(MediaService);
        let mediaServiceSpy:any = spyOn(mediaService, 'getData').and.returnValue(Observable.of(medias));
        fixture.detectChanges();

        searchInputEl.textContent = 'cny';
        comp.typeAheadModel = new SearchTerm('cny', 'cny');
        searchButtonEl.click();

        expect(mediaServiceSpy).toHaveBeenCalledWith('tags', comp.typeAheadModel);
        expect(comp.medias.length).toEqual(2);
        expect(comp.medias[0].title).toEqual('Title 1', 'wrong value for comp.medias[0].title');
        expect(comp.medias[1].title).toEqual('Title 2', 'wrong value for comp.medias[1].title');
    });

    it('should populate search-result-panel with medias', () => {
        comp.medias = medias;
        fixture.detectChanges();

        let mediaContainers = de.queryAll(By.css('.media-container'));
        let firstMediaTitleEl = mediaContainers[0].query(By.css('h3')).nativeElement;
        let secondMediaTitleEl = mediaContainers[1].query(By.css('h3')).nativeElement;

        expect(mediaContainers.length).toEqual(2);
        expect(firstMediaTitleEl.textContent).toContain('Title 1');
        expect(secondMediaTitleEl.textContent).toContain('Title 2');
    });
});

class AuthServiceStub {
    authenticate():void {
        console.log('authenticating');
    }
}

class DragulaServiceStub extends DragulaService {
    private options:any = {};

    public setOptions(key:string, options:any):void {
        this.options[key] = options;
    }

    public getOptions():any {
        return this.options;
    }
}
