import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/core/reqester.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public tableReports: [];
  public constructor(
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const data = this.route.snapshot.data['reports'];
    this.extractmenuItems(data);
  }

  private extractmenuItems(data: any): void {
    this.tableReports = data;
    console.log(this.tableReports);
  }
}
