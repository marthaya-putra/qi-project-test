import { OpaqueToken } from '@angular/core';

export interface AuthenticationService {
    setToken(token: string);
    getToken(): string;
    authenticate();
}

export let IAuthenticationService = new OpaqueToken('IAuthentication.Service');