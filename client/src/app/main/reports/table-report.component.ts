import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { Table } from 'src/app/models/tableModel';
import { RequesterService } from 'src/app/core/reqester.service';


@Component({
  selector: 'app-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.css']
})
export class TableReportComponent implements OnInit {
  @Input() public table: Table;

  @Output() edited = new EventEmitter<boolean>();
  editComplete = false;

  public tableData: any;
  public currentRow: string;
  public currentCol: string;

  public constructor(private readonly requester: RequesterService) {}


  ngOnInit() {
    const devices: string = this.table.devices.map(x => x.name).join(',');
    const period = `{"from":${this.table.startDateInMilliseconds},"to":${this.table.endDateInMilliseconds}}`;
    return this.call(devices, period);

  }

  public setRowCol(col, row) {
    this.currentCol = col;
    this.currentRow = row;
  }

  public deleteTable() {
    this.requester.delete(`http://localhost:3000/table-reports/${this.table.id}`)
      .subscribe(res => {
        this.editComplete = true;
        this.edited.emit(this.editComplete);
      });
  }

  private call(devices, period) {
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    return this.requester.get(url).subscribe(data => this.tableData = data);
  }
}
