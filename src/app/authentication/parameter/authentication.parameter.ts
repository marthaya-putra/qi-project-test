import { OpaqueToken } from '@angular/core';

export interface AuthenticationParameter{
    clientId: string;
    redirectUrl: string;
    responseType: string;
    scope: string;
}

export let AUTHENTICATION_PARAMETER = new OpaqueToken('Authentication.Parameter');
