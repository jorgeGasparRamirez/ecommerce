import {Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [{
      path: 'dashboard',
      loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    }],
    canActivate: [AuthGuard],
  },

  {path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)},
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];
