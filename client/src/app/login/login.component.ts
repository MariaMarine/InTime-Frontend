import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificatorService } from '../core/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificatorService
  ) { }


  // Reactive forms
  ngOnInit() {

    const email = this.formBuilder.control('', [Validators.required]);
    const password = this.formBuilder.control('', [Validators.required]);
    this.loginForm = this.formBuilder.group({
      email,
      password,
    });
  }

   public login(): void {
    this.authService.loginUser(this.loginForm.value).subscribe(
      res => {
        this.notificationService.show('Successful login!', 'success');
        this.router.navigate(['/admin']);
      },
    (err: HttpErrorResponse) => {
      (err.status === 400) ? this.notificationService.show('Invalid email or password', 'error')
      : this.notificationService.show('Wrong credentials!', 'error');
      }
    );
  }

  public cancel(): void {
    this.router.navigate(['/home']);
  }
}
