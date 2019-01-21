import { AuthService } from './../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../core/navbar.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // use authservice instead?
  constructor(private readonly auth: AuthService,
      private readonly router: Router,
      public nav: NavbarService ) {}
    public isLoggedIn(): Observable<boolean> {
        return this.auth.isLoggedIn$;
          }

  logOut(): void {
    this.auth.logoutUser();
    this.router.navigate(['/home']);
  }
  ngOnInit() {
  }
}
