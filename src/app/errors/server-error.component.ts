import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from '../core/navbar.service';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html'
})
export class ServerErrorComponent implements OnInit {


  constructor(private readonly nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }


}
