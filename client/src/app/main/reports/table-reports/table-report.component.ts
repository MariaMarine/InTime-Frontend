import { FormGroup, FormBuilder } from '@angular/forms';
import { TableMapService } from './../../../core/tableToMap.service';
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

  cellSelected: boolean;
  currentValue = 0;
  userPrefs: any;
  origin: string;
  destination: string;
  prefs: FormGroup;

  public constructor(
    private readonly requester: RequesterService,
    private readonly tableToMap: TableMapService,
    private readonly formBuilder: FormBuilder,
  ) {}


  ngOnInit() {
    this.toggled = true;
    const devices: string = this.table.devices.map(x => x.name).join(',');
    const endDate: number = Date.now();
    const startDate: number = endDate - (this.table.period * 3600 * 1000);
    const period = `{"from":${startDate},"to":${endDate}}`;
    this.userPrefs = {};
    return this.call(devices, period);
  }

  public setRowCol(col, row) {
    this.currentCol = col;
    this.currentRow = row;
  }
  public tableClick(): void {
    this.tableToMap.emitDevices(this.table.devices);
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

  openMinMax(origin, destination) {
    if (origin !== destination) {
      this.cellSelected = true;
    }
    this.origin = origin;
    this.destination = destination;
    this.currentValue = ((this.tableData[destination])[origin]);
    const min = this.formBuilder.control('', []);
    const max = this.formBuilder.control('', []);
    this.prefs = this.formBuilder.group({
      min,
      max,
    });
  }

  setPrefs() {
    console.log(this.origin);
    if (!this.userPrefs[this.origin]) {
      this.userPrefs[this.origin] = {};
    }  // resets previous props??
    this.userPrefs[this.origin][this.destination] = {};
    this.userPrefs[this.origin][this.destination]['min'] = this.prefs.value.min;
    this.userPrefs[this.origin][this.destination]['max'] = this.prefs.value.max;
    console.log(this.userPrefs);
    this.prefs.reset();
    this.cellSelected = false;
  }
/*
  undermin(origin, destination) {
   const currentValue = ((this.tableData[destination])[origin]);
   if (this.userPrefs) {
     if (this.userPrefs[origin]) {
       if (this.userPrefs[origin][destination]) {
        return this.currentValue > this.userPrefs[origin][destination]['min'];
       }
     }
   }
   return false;
  }
*/
  overmax(origin, destination) {
    const currentValue = ((this.tableData[destination])[origin]);
    if (this.userPrefs) {
      if (this.userPrefs[origin]) {
        if (this.userPrefs[origin][destination]) {
         if (currentValue > this.userPrefs[origin][destination]['max']) {
           return 'red';
         } else if ((currentValue > this.userPrefs[origin][destination]['max']  / 2))  {
            return 'yellow';
         } else {
           return 'green';
         }
        }
      }
    }
    return;
   }
  private call(devices, period) {
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    return this.requester.get(url).subscribe(data => this.tableData = data);
  }

}
