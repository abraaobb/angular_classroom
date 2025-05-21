import {inject, PLATFORM_ID} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    }
  }
  router.navigate(['/login']);
  return false;
};
