import {Routes} from '@angular/router';
import {PersonComponent} from './components/person/person.component';
import {PersonEditComponent} from './components/person/person-edit/person-edit.component';
import {LoginComponent} from './components/login/login.component';
import {authGuard} from './guards/auth.guard';
import {loginGuard} from './guards/login.guard';

export const routes: Routes = [
  {path: 'person', component: PersonComponent, canActivate: [authGuard]},
  {path: 'person/edit', component: PersonEditComponent, canActivate: [authGuard]},
  {path: 'person/edit/:id', component: PersonEditComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
  {path: '', redirectTo: 'person', pathMatch: 'full'},
  {path: '**', redirectTo: 'person'}
];
