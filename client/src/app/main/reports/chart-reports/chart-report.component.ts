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
import { StartDate } from 'src/app/models/startDateModel';


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
  public crosshair: any = {
    visible: true,
    tooltip: {
        visible: true,
        format: '##'
    }
};
  public startDates: number [];
  public series: any[];
  public categories: number[];
  public constructor(private readonly requester: RequesterService) {}


  ngOnInit() {
    this.toggled = true;
    const origin = this.chart.origin.name;
    const destination = this.chart.destination.name;
    const period = this.chart.periodInMilliseconds;
    this.startDates = this.chart.startDates.map(date => date.dateInMilliseconds);
    const startDatesStr = this.startDates.join(',');
    this.call(origin, destination, period, startDatesStr);
  }


  public deleteTable() {
    if (!this.createMode) {
    this.requester.delete(`http://localhost:3000/chart-reports/${this.chart.id}`)
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
     });
  }

  public extractValuesX(data) {
    this.values = data;
    const labels = this.values.map(value => new Date(+value.x).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    return labels;
  }

  public extractValuesY(data) {
    this.values = data;
    return this.values.map(value => value.y);
  }

  public displayRange(date): string {
    const startDate = new Date(+date).toLocaleString();
    const endDate = new Date(+date + (+this.chart.periodInMilliseconds)).toLocaleString();
    return `${startDate} - ${endDate}`;
  }
}
