import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile2',
    templateUrl: './profile2.component.html',
    styleUrls: ['./profile2.component.css']
})
export class Profile2Component {

    private tab = false;

    constructor(
        private readonly auth: AuthService,
        private readonly router: Router) { }

    getUserName(): string {
        return this.auth.getUsername();
    }

    logOut(): void {
        this.auth.logoutUser();
        this.router.navigate(['/home']);
      }

    displayTab(): void {
        this.tab = !this.tab;
    }
}
