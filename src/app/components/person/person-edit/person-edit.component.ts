import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../../modules/material.modules';
import {BaseService} from '../../../services/base.service';
import {Person} from '../../../models/person';

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss'
})
export class PersonEditComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly service = inject(BaseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly personForm: FormGroup = this.buildForm();
  readonly personId: string | null = this.route.snapshot.paramMap.get('id');

  submitted = false;

  ngOnInit(): void {
    if (this.personId) {
      this.loadPerson();
    }
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      password: ['', [Validators.minLength(6)]],
    });
  }

  private loadPerson(): void {
    this.service.getObject<Person>('people', this.personId!).subscribe({
      next: (person) => {
        this.personForm.patchValue(person);
        this.personForm.get('password')?.setValue(''); // não preenche senha
      }
    });
  }

  get formControls() {
    return this.personForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.personForm.invalid) return;

    const person: Person = this.personForm.value;

    if (!person.password) {
      delete person.password;
    }

    const request = this.personId
      ? this.service.putObject<Person>(`people/${this.personId}`, person)
      : this.service.postObject<Person>('people', person);

    request.subscribe({
      next: () => this.router.navigate(['/person'])
    });
  }

  onCancel(): void {
    this.router.navigate(['/person']);
  }
}
