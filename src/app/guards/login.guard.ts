import {inject, PLATFORM_ID} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('access_token');
    if (token) {
      router.navigate(['/person']);
      return false;
    }
  }
  return true;
};
