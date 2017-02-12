import { Jsonp, Response, ResponseOptions, BaseRequestOptions } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MediaService} from './media.service';
import { Media } from './media';
import { SearchTerm } from '../../search.term';
import { IAuthenticationService, AuthenticationService } from '../../../authentication/service';
import { SearchTermServiceFactory, SearchTermService} from '../../search.term';
import { Observable } from 'rxjs/Observable';
import { TagSearchService } from '../../search.term/tag';
import { UserSearchService } from '../../search.term/user';
import 'rxjs/add/observable/of';

describe('MediaService', ()=> {

    let service:MediaService = null;
    let backend:MockBackend = null;
    let jsonp:Jsonp = null;
    let lastConnection:MockConnection = null;

    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [
                {
                    provide: IAuthenticationService,
                    useClass: AuthenticationServiceStub
                },
                SearchTermServiceFactory,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Jsonp,
                    useFactory: (backendInstance:MockBackend, defaultOptions:BaseRequestOptions) => {
                        return new Jsonp(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                MediaService,
                TagSearchService,
                UserSearchService
            ]
        });

        service = TestBed.get(MediaService);
        backend = TestBed.get(MockBackend);
        jsonp = TestBed.get(Jsonp);
    });

    it('should call correct end point & return expected result for getData()', (done) => {
        const expectedResponse = {
            data: [{
                user: {
                    username: 'testuser',
                },
                link: 'http://link',
                images: {
                    thumbnail: {
                        url: 'http://thumbnail'
                    }
                },
                caption: {
                    text: 'caption'
                }
            }, {
                user: {
                    username: 'testuser2',
                },
                link: 'http://link2',
                images: {
                    thumbnail: {
                        url: 'http://thumbnail2'
                    }
                },
                caption: {
                    text: 'caption2'
                }
            }]
        };

        backend.connections.subscribe((connection:MockConnection) => {
            let options = new ResponseOptions({
                body: JSON.stringify(expectedResponse)
            });
            lastConnection = connection;
            connection.mockRespond(new Response(options));
        });


        let expectedUrl:string = 'https://api.instagram.com/v1/users/1/media/recent?access_token=mytoken&count=10&callback=JSONP_CALLBACK';

        service.getData('users', new SearchTerm('1', 'User 1'))
            .subscribe((r) => {
                expect(r.length).toEqual(2);
                expect(r[0].title).toEqual('testuser');
                expect(r[1].title).toEqual('testuser2');
                expect(lastConnection.request.url).toEqual(expectedUrl);
                done();
            });

    });

});

class AuthenticationServiceStub implements AuthenticationService {
    constructor() {
    }

    public setToken(token:string) {
    }

    public getToken():string {
        return 'mytoken'
    }

    public authenticate() {
    }
}