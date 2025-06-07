import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {AuthService} from '../../core/services/auth.services';
import {Login, Logout} from './auth.actions';
import {catchError, tap} from 'rxjs';
import {Router} from '@angular/router';

export interface AuthStateModel {
  token: string | null;
  email: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    email: null,
  }
})

@Injectable()
export class AuthState {
  private authService = inject(AuthService);
  private router = inject(Router);

  @Selector()
  static getToken(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static getIsAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    console.log('Entro en login');
    return this.authService.login(action.email, action.password).pipe(tap((result: { token: string }) => {
        ctx.patchState({token: result.token, email: action.email});
        this.router.navigate(['/dashboard']).then(navigationSucces => {
          if (!navigationSucces) {
            console.error('Navigation to dashboard failed');
          }
        });
      }), catchError(err => {
        throw err;
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authService.logout(state.token).pipe(tap(() => {
      ctx.setState({token: null, email: null});
    }));
  }
}

