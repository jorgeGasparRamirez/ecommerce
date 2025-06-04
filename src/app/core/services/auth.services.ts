import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, of} from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string) {
    return of({token: 'fake-token'}).pipe(delay(1000));
  }

  logout(token: string | null) {
    return of(null);
  }
}
