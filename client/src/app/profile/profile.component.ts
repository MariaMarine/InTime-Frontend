import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

    constructor(private readonly auth: AuthService) {}
    
    getUserName(): string {
        return this.auth.getUsername();
      }
}
