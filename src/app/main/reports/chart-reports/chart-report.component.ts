import { ChartMapService } from './../../../core/chartToMap.service';
import { Chart } from './../../../models/chartModel';
import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { RequesterService } from 'src/app/core/reqester.service';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { saveAs } from '@progress/kendo-file-saver';
import { geometry, fit, exportPDF, Group } from '@progress/kendo-drawing';

function mm(val: number): number {
  return val * 2.8347;
}

const PAGE_RECT = new geometry.Rect([0, 0], [mm(297 - 20), mm(210 - 20)]);
@Component({
  selector: 'app-chart-report',
  templateUrl: './chart-report.component.html',
  styleUrls: ['./chart-report.component.css']
})
export class ChartReportComponent implements OnInit {

  @ViewChild('char')
  private char: ChartComponent;
  @Input() public chart: Chart;
  @Input() public createMode: boolean;
  @Output() public edited = new EventEmitter<boolean>();
  public editComplete = false;
  @Output() public modifyTable = new EventEmitter<Chart>();
  public chartData: any;
  public toggled: boolean;
  public values: {x: any, y: any}[];

  public startDates: number [];
  public series: any[];
  public categories: number[];
  public constructor(
    private readonly chartToMap: ChartMapService,
    private readonly requester: RequesterService) {}

  ngOnInit() {
    this.toggled = true;
    const origin = this.chart.origin.name;
    const destination = this.chart.destination.name;
    const period = this.chart.periodInMilliseconds;
    this.startDates = this.chart.startDates.map(date => date.dateInMilliseconds);
    const startDatesStr = this.startDates.join(',');
    this.call(origin, destination, period, startDatesStr);
  }

  public tableClick(): void {
    this.chartToMap.emitChart(this.chart);
  }

  public deleteTable() {
    if (!this.createMode) {
    this.requester.delete(`https://intime-backend-server.herokuapp.com/chart-reports/${this.chart.id}`)
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
    const labels = this.values.map((value, i, arr) => arr.length <= 8 ?
      new Date(+value.x).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
      : (i % 4 === 0) ? new Date(+value.x).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
      : '');
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
  public exportScaledChart(char): void {
    const visual = char.exportVisual();
    const content = new Group();

    content.append(visual);
    fit(content, PAGE_RECT);

    this.exportElement(content);
  }

  private exportElement(element: any): void {
    exportPDF(element, {
      paperSize: 'A4',
      landscape: true,
      margin: '1cm'
    }).then((dataURI) => {
      saveAs(dataURI, `${this.chart.name}.pdf`);
    });
  }
}
