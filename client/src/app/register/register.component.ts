import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificatorService } from 'src/app/core/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationService: NotificatorService,
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
    .subscribe(res => {
      this.notificationService.show('Successful registration!', 'success');
      this.router.navigate(['/login']);
    },
    (err: HttpErrorResponse) => {
      (err.status === 400) ? this.notificationService.show('Invalid email or password', 'error')
        : this.notificationService.show(`User already exists`, 'error');

    });
  }

  public cancel(): void {
    this.router.navigate(['/home']);
  }
}
