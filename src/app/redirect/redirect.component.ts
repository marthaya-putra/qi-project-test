import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app.service';
import { IAuthenticationService, AuthenticationService } from '../authentication/service';

@Component({
    selector: 'redirect',
    template: ''
})

export class RedirectComponent {
    private authenticationService: AuthenticationService;

    constructor(private activatedRoute:ActivatedRoute,
                private appState:AppState,
                private router:Router,
                @Inject(IAuthenticationService) authenticationService:AuthenticationService) {

        this.authenticationService = authenticationService;
        const routeFragment:Observable<string> = activatedRoute.fragment;
        routeFragment.subscribe(fragment => {

            let token:string = fragment.replace('access_token=', '');
            this.authenticationService.setToken(token);
            this.appState.set('isAuthenticated', true);

            router.navigate(['/home']);
        });
    }

}
