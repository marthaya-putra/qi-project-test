import { MockBackend } from '@angular/http/testing';
import { Jsonp, ConnectionBackend, BaseRequestOptions, RequestOptions } from '@angular/http';
import { ReflectiveInjector, Injector } from '@angular/core';
import { SearchTermServiceFactory } from './search.term.service.factory';
import { TagSearchService } from './tag';
import { UserSearchService } from './user';
import { SearchTermService } from './search.term.service';
import { AUTHENTICATION_PARAMETER } from '../../authentication/parameter';
import { AuthenticationService, IAuthenticationService } from '../../authentication/service';
import { InstagramAuthenticationService } from '../../authentication/service/instagram';

describe('SearchTermServiceFactory', () => {

    it('should create expected SearchTermService instances', ()=> {

        let injector:Injector = ReflectiveInjector.resolveAndCreate([{
                provide: AUTHENTICATION_PARAMETER,
                useValue: {
                    clientId: '9a502ab143604ca3a677647eb062f310',
                    redirectUrl: 'http://localhost:3000/redirect',
                    responseType: 'token',
                    scope: 'public_content'
                }
            }, {
                provide: IAuthenticationService,
                useClass: InstagramAuthenticationService
            }, {
                    provide: IAuthenticationService,
                    useClass: InstagramAuthenticationService
                },
                {
                    provide: ConnectionBackend,
                    useClass: MockBackend
                }
                ,
                {
                    provide: RequestOptions,
                    useClass: BaseRequestOptions
                },
                Jsonp
            ])
            ;

        let factory:SearchTermServiceFactory = new SearchTermServiceFactory(injector);
        let userSearchService:SearchTermService = factory.getService('users');
        let tagSearchService:SearchTermService = factory.getService('tags');

        expect(userSearchService instanceof UserSearchService).toBeTruthy('Not UserSearchService');
        expect(tagSearchService instanceof TagSearchService).toBeTruthy('Not TagSearchService');
    });

})
;

