import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarService } from '../core/navbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  constructor(private readonly nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }

  ngOnDestroy(): void {
    this.nav.hide();
}

}
