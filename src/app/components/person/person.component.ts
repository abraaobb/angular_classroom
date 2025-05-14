import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseService} from '../../services/base_service';
import {Person} from '../../models/person';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class PersonComponent implements OnInit {
  people: Person[] = [];
  loading = false;
  error: string | null = null;

  constructor(private service: BaseService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.loading = true;
    this.error = null;

    this.service.getAll<Person>('people').subscribe({
      next: (response) => {
        this.people = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar pessoas: ' + error.message;
        this.loading = false;
      }
    });

  }

  viewPerson(person: Person) {
    // Implementar visualização detalhada
    console.log('Visualizar pessoa:', person);
  }

  editPerson(person: Person) {
    // Implementar edição
    console.log('Editar pessoa:', person);
  }

  deletePerson() {
    // if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
    //   this.service.deleteObject('people', id).subscribe({
    //     next: () => {
    //       this.loadPeople(); // Recarrega a lista
    //     },
    //     error: (error) => {
    //       this.error = 'Erro ao excluir pessoa: ' + error.message;
    //     }
    //   });
    // }
  }

  createNew() {
    this.router.navigate(['/person/edit']);
  }

}
