import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequesterService } from '../core/reqester.service';


function passMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const passControl = c.get('newPass');
    const confirmControl = c.get('confirmNewPass');

    if (passControl.pristine || confirmControl.pristine) {
        return null;
    }

    if (passControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}


@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

    edit: FormGroup;
    constructor(private fb: FormBuilder,
                private http: RequesterService) { }

    ngOnInit() {
        this.edit = this.fb.group({
            oldPass: ['', Validators.required],
            newPassGroup: this.fb.group({
                newPass: ['', Validators.required],
                confirmNewPass: ['', Validators.required],
            }, { validator: passMatcher })
        });
    }

    save() {
        this.http.put('https://intime-backend-server.herokuapp.com/users', {});
    }
}
