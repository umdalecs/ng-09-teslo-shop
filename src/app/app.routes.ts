import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guards/not-authenticated-guard';
import { isAdminGuard } from './auth/guards/is-admin-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [notAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.routes'),
    canMatch: [isAdminGuard]
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];
