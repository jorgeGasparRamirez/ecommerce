export class Login {
  static readonly type: string = '[Auth] Login';

  constructor(public email: string, public password: string) {
  }
}

export class Logout {
  static readonly type: string = '[Auth] Logout';
}
