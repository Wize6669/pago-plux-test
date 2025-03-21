import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { getSecureLocalStorage, removeSecureLocalStorage } from '../../utils';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  currentRoute: string = '';
  userInfo = getSecureLocalStorage('userInfo');

  constructor() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  logout() {
    removeSecureLocalStorage('userInfo');
    this.router.navigate(['/login']);
  }

  transactions() {
    this.router.navigate(['/transactions']);
  }

  home() {
    this.router.navigate(['/dashboard']);
  }

  isHome(): boolean {
    return this.currentRoute === '/dashboard';
  }

  isTransactions(): boolean {
    return this.currentRoute === '/transactions';
  }
}