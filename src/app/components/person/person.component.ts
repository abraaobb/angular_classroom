import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseService} from '../../services/base.service';
import {Person} from '../../models/person';
import {Router} from '@angular/router';
import {MaterialModule} from '../../modules/material.modules';
import {DialogService} from '../../services/dialog.service';
import {PersonViewDialogComponent} from './person-view-dialog/person-view-dialog.component';

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
  matColumns = ['id', 'username', 'email', 'type', 'actions']
  private service = inject(BaseService);
  private router = inject(Router);
  private dialog = inject(DialogService);

  people: Person[] = [];
  loading = false;
  error: string | null = null;

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
    this.dialog.openDialog(PersonViewDialogComponent, {
      width: '500px', // Largura do modal
      data: {person}, // Passa os dados da pessoa para o modal
    });
  }

  editPerson(person: Person) {
    this.router.navigate(['/person/edit', person.id]);
  }

  deletePerson(person: Person) {
    this.dialog.confirmDialog({
      title: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir o ${person.username}?`,
      confirmText: 'Excluir',
      cancelText: 'Cancelar'
    }).subscribe(result => {
      if (result) {
        this.service.deleteObject('people', person.id!).subscribe({
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
