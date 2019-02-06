import { Device } from 'src/app/models/deviceModel';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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

@Input() reportsUpdate: boolean;
@Output() updateEvent = new EventEmitter<boolean>();

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly http: RequesterService,
  ) {}

  public ngOnInit(): void {
    this.createMode = false;
    this.modifyMode = false;
    if (this.reportsUpdate) {
      this.reportsUpdate = false;
      this.refresh();
    } else {
      this.tableReports = this.route.snapshot.data['reports'];
    }
  }
  public onEdit(edited) {

    this.createMode = false;
    this.modifyMode = false;
    if (edited) {
      this.updateEvent.emit(true);
      this.refresh();
    }
  }
  public modify(table) {
    this.modifyMode = true;
    this.createMode = true;
    this.currentTable = table;
  }

  private refresh() {
    return this.http.get('https://intime-backend-server.herokuapp.com/table-reports')
      .subscribe((res: Table[]) => {
        this.tableReports = res;
      });
  }
}
