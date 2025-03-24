import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private transactionSubject = new BehaviorSubject<{ status: string; id?: string; message?: string } | null>(null);
  transaction$ = this.transactionSubject.asObservable();

  sendTransaction(status: string, id?: string, message?: string) {
    this.transactionSubject.next({ status, id, message });
  }
}
