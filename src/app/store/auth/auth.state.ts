import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {AuthService} from '../../core/services/auth.services';
import {Login, Logout} from './auth.actions';
import {tap} from 'rxjs';

export interface AuthStateModel {
  token: string | null;
  username: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
  }
})

@Injectable()
export class AuthState {
  private authService = inject(AuthService);

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
    return this.authService.login(action.username, action.password).pipe(tap((result: { token: string }) => {
      ctx.patchState({token: result.token, username: action.username});
    }));
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    const state = ctx.getState();
    return this.authService.logout(state.token).pipe(tap(() => {
      ctx.setState({token: null, username: null});
    }));
  }
}

