import {CanActivate, GuardResult, MaybeAsync, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from '../../store/auth/auth.state';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    const isAuthenticated = this.store.selectSnapshot(AuthState.getIsAuthenticated);
    return isAuthenticated || this.router.parseUrl('/login');
  }

}
