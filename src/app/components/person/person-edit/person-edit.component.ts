import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BaseService} from '../../../services/base_service';
import {Person} from '../../../models/person';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-person-edit',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss',
  standalone: true
})
export class PersonEditComponent implements OnInit {
  constructor(private service: BaseService) {
  }

  ngOnInit() {
  }

  create() {
    // this.service.postObject<Person>('people', this.person!).subscribe({
    //   next: (response) => {
    //     console.log('Pessoa criada com sucesso:', response);
    //     this.ngOnInit();
    //   },
    //   error: (error) => {
    //     console.error('Erro ao criar pessoa:', error);
    //     // Trate o erro adequadamente
    //   }
    // });
  }
}
