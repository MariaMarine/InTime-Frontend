import { Device } from 'src/app/models/deviceModel';
import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/core/reqester.service';

import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/tableModel';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

  public devices: Device [];
  public tableReports: Table[];
  public createMode: boolean;
  public routeForm: FormGroup;
  public modifyMode: boolean;
  public currentTable: Table;
  public createButtonText = 'Create new table';
  public modifyButtonText = 'Modify table';

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly http: RequesterService,
  ) {}

  public ngOnInit(): void {
    this.createMode = false;
    this.modifyMode = false;
    this.tableReports = this.route.snapshot.data['reports'];
  }
  public onEdit(edited) {
    this.createMode = false;
    this.modifyMode = false;
    if (edited) {
    window.scrollTo(0, 0);
    return this.http.get('http://localhost:3000/table-reports').subscribe((res: Table[]) => {
      this.tableReports = res;
      });
    }
  }

  public modify(table) {
    this.modifyMode = true;
    this.createMode = true;
    this.currentTable = table;
  }
}
