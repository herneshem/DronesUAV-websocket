
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export const demoReadonlyGuard: CanActivateFn = () => {
  if (environment.mode === 'DEMO') {
    return inject(Router).parseUrl('/dashboard');
  }

  return true;
};
