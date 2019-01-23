import { Device } from './../../models/deviceModel';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/tableModel';
import { RequesterService } from 'src/app/core/reqester.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit {
  @Input() public table: Table;

  public tableData: Observable<any>;
  public currentRow: string;
  public currentCol: string;

  public constructor(private readonly router: Router,
    private readonly requester: RequesterService) {}


  ngOnInit() {
    const devices: string = this.table.devices.map(x => x.name).join(',');
    const period = `{"from":${this.table.startDateInMilliseconds},"to":${this.table.endDateInMilliseconds}}`;
    return this.call(devices, period);

  }

private call(devices, period) {
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    return this.extractReports(this.requester.get(url).pipe());
  }
  private extractReports(data: any) {
    this.tableData = data;
  }

  setRowCol(col, row) {
    this.currentCol = col;
    this.currentRow = row;
  }
}
