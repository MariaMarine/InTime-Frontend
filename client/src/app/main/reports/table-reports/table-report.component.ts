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
  @Input() public createMode: boolean;
  @Output() public edited = new EventEmitter<boolean>();
  public editComplete = false;
  @Output() public modifyTable = new EventEmitter<Table>();
  public tableData: any;
  public currentRow: string;
  public currentCol: string;
  public toggled: boolean;

  public constructor(private readonly requester: RequesterService) {}


  ngOnInit() {
    this.toggled = true;
    const devices: string = this.table.devices.map(x => x.name).join(',');
    const endDate: number = Date.now();
    const startDate: number = endDate - (this.table.period * 3600 * 1000);
    const period = `{"from":${startDate},"to":${endDate}}`;
    return this.call(devices, period);
  }

  public setRowCol(col, row) {
    this.currentCol = col;
    this.currentRow = row;
  }

  public deleteTable() {
    if (!this.createMode) {
    this.requester.delete(`http://localhost:3000/table-reports/${this.table.id}`)
      .subscribe(res => {
        this.editComplete = true;
        this.edited.emit(this.editComplete);
      });
    }
  }

  public editTable() {
    if (!this.createMode) {
    this.modifyTable.emit(this.table);
    }
  }
  private call(devices, period) {
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    return this.requester.get(url).subscribe(data => this.tableData = data);
  }
}
