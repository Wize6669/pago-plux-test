import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { getSecureLocalStorage } from '../utils';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userInfo = getSecureLocalStorage('userInfo');

  if (!userInfo || !userInfo?.login) {
    return router.navigate(['/login']);
  }

  return true;
};
