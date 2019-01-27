import { Chart } from './../../../models/chartModel';
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
  selector: 'app-chart-report',
  templateUrl: './chart-report.component.html',
  styleUrls: ['./chart-report.component.css']
})
export class ChartReportComponent implements OnInit {
  @Input() public chart: Chart;
  @Input() public createMode: boolean;
  @Output() public edited = new EventEmitter<boolean>();
  public editComplete = false;
  @Output() public modifyTable = new EventEmitter<Chart>();
  public chartData: any;
  public toggled: boolean;
  public values: {x: any, y: any}[];

  public constructor(private readonly requester: RequesterService) {}


  ngOnInit() {
    this.toggled = false;
    const origin = this.chart.origin.name;
    const destination = this.chart.destination.name;
    const period = this.chart.periodInMilliseconds;
    const startDates: string = this.chart.startDates.map(date => date.dateInMilliseconds).join(',');
    this.call(origin, destination, period, startDates);
  }


  public deleteTable() {
    if (!this.createMode) {
    this.requester.delete(`http://localhost:3000/table-reports/${this.chart.id}`)
      .subscribe(res => {
        this.editComplete = true;
        this.edited.emit(this.editComplete);
      });
    }
  }

  public editTable() {
    if (!this.createMode) {
    this.modifyTable.emit(this.chart);
    }
  }
  private call(origin: string, destination: string, period: number, startDates: string) {
    const url = `http://ec2-35-158-53-19.eu-central-1.compute.amazonaws.com:8080/api/comparePeriods?originDeviceId=${origin}&destinationDeviceId=${destination}&startDates=${startDates}&periodLength=${period}`;
    return this.requester.get(url).subscribe(data => {
      this.chartData = data;
      console.log(this.chartData);
    });
  }

  public extractValues(data) {
    this.values = data;
    return this.values.map(value => value.y);
  }
}
