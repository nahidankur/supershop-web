import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormGroupTouched } from './core/constants/helper';
import { AuthService } from './services/auth.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'supershop-web';

  loginForm!: FormGroup
  isLoggedIn!: boolean;

  constructor(
    public cartService: CartService,
    private readonly _fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAuthState();
    this.loginForm = this._fb.group({
      user_id: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.handleSubmit(this.loginForm.value);
    } else {
      markFormGroupTouched(this.loginForm);
    }
  }

  handleSubmit(payload: any): void {
    this.authService.login$(payload).subscribe({
      next: (res: any) => {
        if(res.code === 200) {
          $('#login').modal('hide');
          this.getAuthState();
        }
      },
      error: (err: any) => console.error(err)
    })
  }

  getAuthState(): void {
    this.isLoggedIn = this.authService.getUserName() ? true: false;
  }

  onLogout(): void {
    this.authService.logOut$().subscribe({
      next: (res: any) => {
        if (res.code === 200) {
          this.getAuthState();
        }
      }
    })
  }
}
