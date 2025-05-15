import {Routes} from '@angular/router';
import {PersonComponent} from './components/person/person.component';
import {PersonEditComponent} from './components/person/person-edit/person-edit.component';

export const routes: Routes = [
  {
    path: 'person',
    children: [
      {path: '', component: PersonComponent},
      {path: 'edit', component: PersonEditComponent},
      {path: 'edit/:id', component: PersonEditComponent}
    ]
  }

];
