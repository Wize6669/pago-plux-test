import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  inputData: string = '';
  responseData: any = null;
  isLoading: boolean = false;

  http = inject(HttpClient);

  sendData(): void {
    if (!this.inputData.trim()) {
      this.responseData = { error: 'Por favor, ingresa un dato.' };
      return;
    }

    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      this.responseData = { error: 'No se encontró el token de autenticación.' };
      return;
    }

    this.isLoading = true;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    this.http
      .get(
        `${environment.hostBackEnd}/api/v1/transactions/getTransactionByIdStateResource?transactionId=${this.inputData.trim()}`,
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.responseData = data;
          this.isLoading = false; 
        },
        error: (error) => {
          this.responseData = {
            status: error.status,
            message: error.error?.error || 'Error desconocido',
          };
          this.isLoading = false;
        },
      });
  }

  clearData(): void {
    this.responseData = null;
    this.inputData = '';
  }
}
