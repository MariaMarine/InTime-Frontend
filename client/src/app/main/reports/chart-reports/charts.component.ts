import { Chart } from './../../../models/chartModel';
import { Device } from 'src/app/models/deviceModel';
import { Component, OnInit } from '@angular/core';
import { RequesterService } from 'src/app/core/reqester.service';

import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/tableModel';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit {

  public devices: Device [];
  public chartReports: Chart[];
  public createMode: boolean;
  public routeForm: FormGroup;
  public modifyMode: boolean;
  public currentTable: Table;
  public createButtonText = 'Create new chart';
  public modifyButtonText = 'Modify chart';

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly http: RequesterService,
  ) {}

  public ngOnInit(): void {
    this.createMode = false;
    this.modifyMode = false;
    this.chartReports = this.route.snapshot.data['charts'];
  }
  public onEdit(edited) {
    this.createMode = false;
    this.modifyMode = false;
    if (edited) {
    return this.http.get('http://localhost:3000/chart-reports').subscribe((res: Chart[]) => {
      this.chartReports = res;
      });
    }
  }

  public modify(table) {
    this.modifyMode = true;
    this.createMode = true;
    this.currentTable = table;
  }
}
