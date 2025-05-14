import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PersonComponent} from './components/person/person.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PersonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front_classroom';
}
