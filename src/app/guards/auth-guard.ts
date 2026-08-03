import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

// Guard topic: stop protected navigation when the authentication flag is missing.
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(Auth);

  if(auth.isAuth()){
    return true;
  }

  // Redirect unauthenticated users before the protected shell is activated.
  return router.createUrlTree(['/login']);
};
