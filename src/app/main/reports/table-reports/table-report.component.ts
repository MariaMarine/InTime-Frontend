import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { NotificatorService } from 'src/app/core/notification.service';

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

    private readonly notificator: NotificatorService,

  ) {}


  ngOnInit() {
    this.toggled = true;
    this.table.devices.sort((a, b) => (+a.latitude - +b.latitude));
    const devices: string = this.table.devices.map(x => x.name).join(',');
    const endDate: number = Date.now();
    const startDate: number = endDate - (this.table.period * 3600 * 1000);
    const period = `{"from":${startDate},"to":${endDate}}`;
    this.userPrefs = this.table.minMaxValues || {};
    return this.call(devices, period);
  }

  public setRowCol(col, row) {
    this.currentCol = col;
    this.currentRow = row;
  }
  public tableClick(): void {
    this.tableToMap.emitDevices(this.table.devices);
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
    const min = this.formBuilder.control(this.checkPrefs(origin, destination)
      ? this.userPrefs[origin][destination]['min']
      : '', [Validators.required, Validators.min(0)]);
    const max = this.formBuilder.control(this.checkPrefs(origin, destination)
      ? this.userPrefs[origin][destination]['max']
      : '', [Validators.required, Validators.min(1)]);
    this.prefs = this.formBuilder.group({
      min,
      max,
    });
  }

  setPrefs() {
    if (this.prefs.value.min >= this.prefs.value.max) {
      this.notificator.show('Minimum expected travel time must be shorter than maximum expected travel time!', 'error');
    } else {
    if (!this.userPrefs[this.origin]) {
      this.userPrefs[this.origin] = {};
    }
    this.userPrefs[this.origin][this.destination] = {};
    this.userPrefs[this.origin][this.destination]['min'] = this.prefs.value.min;
    this.userPrefs[this.origin][this.destination]['max'] = this.prefs.value.max;
    this.table.minMaxValues = this.userPrefs;
    this.requester.put(`https://intime-backend-server.herokuapp.com/table-reports/${this.table.id}`,
      JSON.stringify(this.table)).subscribe(
        () => this.notificator.show('Settings updated', 'success'),
        () => this.notificator.show('Could not update settings', 'error'));
    this.prefs.reset();
    this.cellSelected = false;
    }
  }
  private checkPrefs(origin, destination) {
    return (this.userPrefs !== undefined && this.userPrefs[origin] !== undefined
      && this.userPrefs[origin][destination] !== undefined);
  }
  checkMinMax(origin, destination) {
    const currentValue = ((this.tableData[destination])[origin]);
      if (this.checkPrefs(origin, destination)) {
       const avg = ((this.userPrefs[origin][destination]['max'] +
       this.userPrefs[origin][destination]['min'])  / 2);
      if (currentValue > this.userPrefs[origin][destination]['max']) {
        return 'btn-danger';
       } else if (currentValue > avg)  {
           return 'btn-warning';
       } else if (currentValue >= this.userPrefs[origin][destination]['min'])  {
           return 'btn-success';
       } else {
           return 'btn-dark';
      }
    }
  }

  private call(devices, period) {
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/travelTimeTableData?devices=${devices}&date=${period}`;
    return this.requester.get(url).subscribe(data => this.tableData = data);
  }
  public deleteTable() {
    if (!this.createMode) {
    this.requester.delete(`https://intime-backend-server.herokuapp.com/table-reports/${this.table.id}`)
      .subscribe(res => {
        this.editComplete = true;
        this.edited.emit(this.editComplete);
      });
    }
  }

}
