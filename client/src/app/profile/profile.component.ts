import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificatorService } from '../core/notification.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['/./profile.component.css']
})
export class ProfileComponent implements OnInit {
  passForm: FormGroup;
  private newPass: string;
  private confirmPass: string;
  public editMode: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificatorService,
) { }

  ngOnInit() {
    this.editMode = false;
    const oldPassword = this.formBuilder.control('', [Validators.required]);
    const newPassword = this.formBuilder.control('', [Validators.required]);
    const confirmPass = this.formBuilder.control('', [Validators.required]);
    this.passForm = this.formBuilder.group({
      oldPassword,
      newPassword,
      confirmPass
    });
  }

   public change() {
    this.newPass = this.passForm.value.newPassword;
    this.confirmPass = this.passForm.value.confirmPass;
    if (this.newPass !== this.confirmPass) {
       this.notificationService.show('Confirmed password does not match new password!', 'error')
    } else {
      return this.authService.changePass(this.passForm.value);
    }
  }
  public cancel(): void {
    this.editMode = false;
  }

  public getUserName() {
    return this.authService.getUsername();
  }
}
