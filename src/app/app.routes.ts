import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/reset-password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then(
        (c) => c.ResetPasswordComponent
      ),
  },
  {
    path: 'auth/confirm',
    loadComponent: () =>
      import('./pages/confirm-email/confirm-email.component').then(
        (c) => c.ConfirmEmailComponent
      ),
  },
];
