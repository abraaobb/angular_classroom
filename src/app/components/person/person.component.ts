import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseService} from '../../services/base_service';
import {Person} from '../../models/person';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PersonComponent implements OnInit {
  people: Person[] = [];
  person = {
    name: '',
    email: '',
    type: ''
  };

  error: string = '';

  constructor(private service: BaseService) {
  }

  ngOnInit() {
    this.service.getAll('people').subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.people = data;
      },
      error: (err) => {
        console.error('Erro:', err);
        this.error = err.message;
      }
    });
  }

  create() {
    this.service.postObject<Person>('people', this.person).subscribe({
      next: (response) => {
        console.log('Pessoa criada com sucesso:', response);
        this.person = {
          name: '',
          email: '',
          type: ''
        };
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Erro ao criar pessoa:', error);
        // Trate o erro adequadamente
      }
    });

  }
}
