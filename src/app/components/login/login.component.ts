import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MaterialModule} from '../../modules/material.modules';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        this.authService.saveToken(res.access);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        alert('Usuário ou senha inválidos');
      }
    });
  }

  get formControls() {
    return this.form.controls;
  }
}
