import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BaseService} from '../../../services/base-service';
import {Person} from '../../../models/person';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';

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
  personForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private service: BaseService,
              private router: Router
  ) {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  get f() {
    return this.personForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // para se o formulário for inválido
    if (this.personForm.invalid) {
      return;
    }

    const person: Person = this.personForm.value;

    this.service.postObject<Person>('people', person).subscribe({
      next: (response) => {
        console.log('Pessoa criada com sucesso:', response);
        this.router.navigate(['/person']); // retorna para a lista
      },
      error: (error) => {
        console.error('Erro ao criar pessoa:', error);
        // Aqui você pode adicionar uma mensagem de erro para o usuário
      }
    });
  }

  onCancel() {
    this.router.navigate(['/person']);
  }
}
