import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BaseService} from '../../../services/base-service';
import {Person} from '../../../models/person';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MaterialModule} from '../../../modules/material.modules';

@Component({
  selector: 'app-person-edit',
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.scss',
  standalone: true
})
export class PersonEditComponent implements OnInit {
  personForm: FormGroup;
  submitted = false;
  personId: string | null = null;

  constructor(private formBuilder: FormBuilder,
              private service: BaseService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.personId = this.route.snapshot.paramMap.get('id');
    if (this.personId) {
      this.service.getObject<Person>('people', this.personId).subscribe({
        next: (response) => {
          this.personForm.patchValue(response);
        }
      });
    }
  }

  get f() {
    return this.personForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.personForm.invalid) {
      return;
    }

    const person: Person = this.personForm.value;

    if (this.personId) {
      this.service.putObject<Person>('people/' + this.personId, person).subscribe({
        next: () => {
          this.router.navigate(['/person']);
        }
      });
    } else {
      this.service.postObject<Person>('people', person).subscribe({
        next: (response) => {
          this.router.navigate(['/person']); // Volta para a lista
        },
      });
    }

  }

  onCancel() {
    this.router.navigate(['/person']);
  }
}
