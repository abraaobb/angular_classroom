import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseService} from '../../services/base-service';
import {Person} from '../../models/person';
import {Router} from '@angular/router';
import {MaterialModule} from '../../modules/material.modules';
import {DialogService} from '../../services/dialog-service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PersonComponent implements OnInit {
  private dialog = inject(DialogService);
  people: Person[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private service: BaseService,
    private router: Router,
  ) {
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
    console.log('Visualizar pessoa:', person);
  }

  editPerson(person: Person) {
    console.log('Editar pessoa:', person);
  }

  deletePerson(id: string) {
    this.dialog.confirmDialog({
      title: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir este registro?',
      confirmText: 'Excluir',
      cancelText: 'Cancelar'
    }).subscribe(result => {
      if (result) {
        this.service.deleteObject<Person>('people', id).subscribe({
          next: () => {
            this.loadPeople();
          },
          error: () => {
          }
        })
      }
    });

  }

  createNew() {
    this.router.navigate(['/person/edit'])
      .then(() => console.log('Navegação bem sucedida'))
      .catch(error => console.error('Erro na navegação:', error));
  }

}
