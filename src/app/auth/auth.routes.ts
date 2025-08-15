import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default authRoutes;
