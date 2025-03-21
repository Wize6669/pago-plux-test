import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  getSecureLocalStorage,
  processErrorsForm,
  removeSecureLocalStorage,
  setSecureLocalStorage,
} from '../../utils';
import { LoginResponse } from '../../models/auth';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  errors: { [key: string]: string } = {};
  rememberMe: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    const storedCredentials = getSecureLocalStorage('credentials');

    if (storedCredentials) {
      this.credentials = storedCredentials;
      this.rememberMe = true;
    }
  }

  http = inject(HttpClient);

  router = inject(Router);

  onLogin() {
    this.errors = {};

    if (!this.rememberMe) {
      removeSecureLocalStorage('credentials');
    }

    this.http
      .post<LoginResponse>(
        `${environment.hostBackEnd}/api/v1/login`,
        this.credentials
      )
      .subscribe({
        next: (response) => {
          if (this.rememberMe) {
            setSecureLocalStorage('credentials', this.credentials);
          }

          if (response?.token) {
            localStorage.setItem('authToken', response.token);
          }

          setSecureLocalStorage('userInfo', {
            id: response?.id,
            name: response?.name,
            surname: response?.surname,
            email: response?.email,
            login: true,
          });

          this.isLoading = false; 
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errors = processErrorsForm(error.error);
          this.isLoading = false; 
        },
      });
  }
}
