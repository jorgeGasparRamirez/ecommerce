import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Login} from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  // private authService = inject(AuthService);
  // private router = inject(Router);
  private store = inject(Store);

  get email() {
    return this.credentials.get('email') as FormControl<string | null>;
  }

  get password() {
    return this.credentials.get('password') as FormControl<string | null>;
  }

  onSubmit() {
    console.log('Entro en el login');
    console.log(this.credentials.value);
    if (this.credentials.valid) {
      const {email, password} = this.credentials.value;
      // this.authService.login(email!, password!).subscribe({
      //   next: (response) => {
      //     console.log('login success $response', response);
      //     this.router.navigate(['']);
      //   }, error: (err) => {
      //     console.log(err.message);
      //   }
      // });
      this.store.dispatch(new Login(email!, password!));

    }

  }

}
