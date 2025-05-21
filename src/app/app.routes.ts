import {Routes} from '@angular/router';
import {PersonComponent} from './components/person/person.component';
import {PersonEditComponent} from './components/person/person-edit/person-edit.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: 'person', component: PersonComponent},
  {path: 'person/edit', component: PersonEditComponent},
  {path: 'person/edit/:id', component: PersonEditComponent},
  {path: 'login', component: LoginComponent}
];
