import { Routes } from '@angular/router';
import { ScrapperComponent } from './scrapper';
import { RedirectComponent } from './redirect';
import { SettingsComponent } from './settings';
import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',  component: ScrapperComponent },
  { path: 'home',  component: ScrapperComponent },
  { path: 'settings',  component: SettingsComponent },
  { path: 'redirect', component: RedirectComponent},
  { path: 'access_token', component: RedirectComponent},
];
