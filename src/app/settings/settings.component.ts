import { Component, Inject} from '@angular/core';
import { AUTHENTICATION_PARAMETER, AuthenticationParameter } from '../authentication/parameter';
import { IAuthenticationService, AuthenticationService } from '../authentication/service';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent {
    public params:AuthenticationParameter;
    private authService:AuthenticationService;

    constructor(@Inject(AUTHENTICATION_PARAMETER) params:AuthenticationParameter,
                @Inject(IAuthenticationService) authService:AuthenticationService) {
        this.params = params;
        this.authService = authService;
    }

    public onSubmit() {
        this.authService.authenticate();
    }
}
