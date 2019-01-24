import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/core/reqester.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/tableModel';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  public tableReports: Table[];
  public constructor(
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const data = this.route.snapshot.data['reports'];
    this.extractReports(data);
  }

  private extractReports(data: any): void {
    this.tableReports = data;
  }
}
