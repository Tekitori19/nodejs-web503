import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./auth/auth.routes').then(m => m.registerRoutes)
  }
];
