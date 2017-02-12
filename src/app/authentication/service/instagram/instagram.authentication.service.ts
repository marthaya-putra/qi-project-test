import { Inject } from '@angular/core';
import { AuthenticationParameter, AUTHENTICATION_PARAMETER } from '../../parameter';
import { AuthenticationService } from '../authentication.service';

export class InstagramAuthenticationService implements AuthenticationService {
    private param:AuthenticationParameter;
    private token:string;

    constructor(@Inject(AUTHENTICATION_PARAMETER) param:AuthenticationParameter) {
        this.param = param;
    }

    public setToken(token:string):void {
        this.token = token;
    }

    public getToken():string {
        return this.token;
    }

    public authenticate():void {
        window.location.href
            = `https://api.instagram.com/oauth/authorize/?client_id=${this.param.clientId}&redirect_uri=${this.param.redirectUrl}&response_type=${this.param.responseType}&scope=${this.param.scope}`;

    }
}