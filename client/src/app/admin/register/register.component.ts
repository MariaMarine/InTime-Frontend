import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  error: string;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    // private readonly notificator: NotificatorService,

    private readonly formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    const email = this.formBuilder.control('', [Validators.required]);
    const password = this.formBuilder.control('', [Validators.required]);
    this.regForm = this.formBuilder.group({
      email,
      password,
    });
  }
  public register(): void {
    this.authService.registerUser(this.regForm.value)
    .subscribe(res => this.router.navigate(['/login']),
    (err: HttpErrorResponse) => {
      (err.status === 400) ?  this.error = `Invalid email or password`
        : this.error = `User already exists`;

    });
  }

  public cancel(): void {
    this.router.navigate(['/home']);
  }
}
