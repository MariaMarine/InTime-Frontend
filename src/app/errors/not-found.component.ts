import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from '../core/navbar.service';

@Component({
  selector: 'app-notfound-error',
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit {

  constructor(private readonly nav: NavbarService) { }

  ngOnInit() {
  }
}
