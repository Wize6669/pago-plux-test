import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private paymentSubscription!: Subscription;
  transactionMessage: string = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    window.addEventListener('paymentSuccess', (event: any) => {
      this.paymentService.sendTransaction('success', event.detail);
    });

    window.addEventListener('paymentError', (event: any) => {
      this.paymentService.sendTransaction('error', undefined, event.detail);
    });

    this.paymentSubscription = this.paymentService.transaction$.subscribe(
      (data) => {
        if (data) {
          this.showToast(
            data.status,
            data.id || data.message || 'No details available'
          );
        }
      }
    );
  }

  showToast(status: string, message: string) {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${
      status === 'success' ? 'success' : 'danger'
    } border-0 show`;
    
    toast.style.position = 'fixed';
    toast.style.top = '20px'; 
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.zIndex = '1050';
    toast.style.padding = '10px';
    toast.style.width = 'auto';
    toast.style.whiteSpace = 'nowrap';

    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${status === 'success' ? 'El ID de la transacción es: ' : 'Error: '}
          <strong>${message}</strong>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 700);
    }, 8000);
  }

  ngOnDestroy(): void {
    this.paymentSubscription.unsubscribe();
  }
}
