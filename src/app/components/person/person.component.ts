import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseService} from '../../services/base-service';
import {Person} from '../../models/person';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast-service';
import {MaterialModule} from '../../modules/material.modules';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
  standalone: true,
  imports: [CommonModule,
    MaterialModule
  ]
})
export class PersonComponent implements OnInit {
  people: Person[] = [];
  loading = false;
  error: string | null = null;

  constructor(private service: BaseService,
              private router: Router,
              private toastService: ToastService) {
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

  deletePerson(id: string) {
    // const modalRef = this.modalService.open(ConfirmModalComponent);
    // modalRef.componentInstance.message = 'Tem certeza que deseja excluir esta pessoa?';
    //
    // modalRef.result.then(
    //   (result) => {
    //     if (result) {
    //       this.service.deleteObject('people', id).subscribe({
    //         next: () => {
    //           this.loadPeople(); // Recarrega a lista
    //           this.toastService.showSuccess('Pessoa excluída com sucesso!');
    //         },
    //         error: (error) => {
    //           this.error = 'Erro ao excluir pessoa: ' + error.message;
    //         }
    //       });
    //     }
    //   },
    //   () => {
    //   } // Dismiss
    // );
  }

  createNew() {
    this.router.navigate(['/person/edit']);
  }

}
