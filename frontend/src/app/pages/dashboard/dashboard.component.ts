import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userData = {
    PayboxRemail: 'dmorales@pagoplux.com',
    PayboxSendmail: 'zapataw59@gmail',
    PayboxRename: '',
    PayboxSendname: '',
    PayboxBase0: '2.0',
    PayboxBase12: '10.0',
    PayboxDescription: '',
    PayboxLanguage: 'es',
    PayboxDirection: '',
    PayBoxClientPhone: '',
    PayboxProduction: false,
    PayboxRecurrent: false,
    PayBoxClientIdentification: '1754199055',
    PayboxEnvironment: 'sandbox',
    PayboxPagoPlux: false,
    PayboxClientID: 'o3NXHGmfujN3Tyzp1cyCDu3xs',
    PayboxSecretKey: 'TkBhZQP3zwMyx3JwC5HeFqzXM4p0jzsXp0hTbWRnI4riUtJT'
  };

  ngOnInit(): void {
    (window as any).data = this.userData;
    (window as any).onAuthorize = this.onAuthorize.bind(this);
  }

  initializePagoPlux(): void {
    (window as any).data = this.userData;
  }

  submitForm(): void {
    this.initializePagoPlux();
  }

  onAuthorize(response: any): void {
    console.log('Pago autorizado:', response);

    if (response.status === 'succeeded') {
      
    } else {
      console.error('Pago fallido o pendiente:', response);
    }
  }
}
