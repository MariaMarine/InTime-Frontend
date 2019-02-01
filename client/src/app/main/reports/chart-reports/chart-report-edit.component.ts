import { HttpErrorResponse } from '@angular/common/http';
import { Device } from 'src/app/models/deviceModel';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NotificatorService } from 'src/app/core/notification.service';
import { RequesterService } from 'src/app/core/reqester.service';
import { Chart } from 'src/app/models/chartModel';

@Component({
    selector: 'app-chart-report-edit',
    templateUrl: './chart-report-edit.component.html',
    styleUrls: ['./chart-report-edit.component.css']
  })
  export class ChartReportEditComponent implements OnInit {
    public devices: Device [];
    public routeForm: FormGroup;
    @Output() public edited = new EventEmitter<boolean>();
    public editComplete = false;
    @Input() public modifyMode: boolean;
    public value: any [];
    public originUpdate: Device;
    public destinationUpdate: Device;
    @Input() public currentChart: Chart;
    public dateRange: any = {};
    public singleDateRange: any = {};
    public startDates: any = [];
    public defaultStartDateInMs: any;
    public defaultEndDateInMs: any;
    public options: any;
    public optionsSingle: any;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly notificationService: NotificatorService,
        private readonly http: RequesterService,
    ) {}
    ngOnInit(): void {
        this.devices = this.route.snapshot.data['devices'];
        if (this.modifyMode && this.currentChart.startDates.length > 1) {
            this.startDates = this.currentChart.startDates.map(date => date.dateInMilliseconds).slice(1);
        }
        this.setOptions();
        const name = this.formBuilder.control(this.modifyMode ? `${this.currentChart.name}`
            : '', [Validators.required, Validators.minLength(3)]);
        const origin = this.formBuilder.control(this.modifyMode ? this.currentChart.origin
            : '', [Validators.required]);
        const destination = this.formBuilder.control(this.modifyMode ? this.currentChart.destination
            : '', [Validators.required]);
        const periodInMilliseconds = this.formBuilder.control(this.modifyMode ? `${this.currentChart.periodInMilliseconds }`
            : '', []);
        const startDates = this.formBuilder.control('', []);
        this.routeForm = this.formBuilder.group({
            name,
            origin,
            destination,
            periodInMilliseconds,
            startDates,
        });
    }

    private setOptions () {
        this.defaultStartDateInMs = this.modifyMode ? this.currentChart.startDates
            .map(date => date.dateInMilliseconds)[0] : Date.now() - 28800000;
        this.defaultEndDateInMs = this.modifyMode ? +(this.currentChart.startDates
            .map(date => date.dateInMilliseconds))[0] + (+this.currentChart.periodInMilliseconds)
            : Date.now();
        this.options = {
            timePicker: true,
            locale: { format: 'M/DD/YYYY, hh:mm A' },
            alwaysShowCalendars: false,
            startDate: (new Date(+this.defaultStartDateInMs).toLocaleString()),
            endDate: (new Date(+this.defaultEndDateInMs).toLocaleString()),
            drops: 'up',
        };
        this.optionsSingle = {
            timePicker: true,
            singleDatePicker: true,
            autoUpdateInput: false,
            locale: {
              cancelLabel: 'Clear'
            },
            alwaysShowCalendars: false,
            maxDate: new Date().toLocaleString(),
            drops: 'up',
        };
    }
    public createRoute() {
        this.dateRange.start === undefined ? this.routeForm.value.startDates = [this.defaultStartDateInMs, ...this.startDates]
         : this.routeForm.value.startDates = [this.dateRange.start.valueOf(), ...this.startDates];
         this.dateRange.start === undefined ? this.routeForm.value.periodInMilliseconds =
         this.defaultEndDateInMs - this.defaultStartDateInMs
         : this.routeForm.value.periodInMilliseconds = this.dateRange.end.valueOf() - this.dateRange.start.valueOf();
        if (this.originUpdate) {
            this.routeForm.value.origin = this.originUpdate;
        }
        if (this.destinationUpdate) {
            this.routeForm.value.destination = this.destinationUpdate;
        }
        if (this.routeForm.value.destination.name === this.routeForm.value.origin.name) {
            this.notificationService.show(`Origin can't be the same as destination!`, 'error');
        } else {
            const action = this.modifyMode ? `updated` : `created`;
            const request = this.modifyMode ? this.http.put
                (`http://localhost:3000/chart-reports/${this.currentChart.id}`, JSON.stringify(this.routeForm.value))
                : this.http.post('http://localhost:3000/chart-reports', JSON.stringify(this.routeForm.value));
            request.subscribe(() => {
                this.notificationService.show(`Report ${action}!`, 'success');
                this.editComplete = true;
                this.routeForm.reset();
                this.edited.emit(this.editComplete);
                },
                (err: HttpErrorResponse) => {
                    this.notificationService.show(`Report failed to be ${action}!`, 'error');
                });
            }
      }
    public originChange(event) {
          this.originUpdate = event;
      }
    public destinationChange(event) {
        this.destinationUpdate = event;
    }
    public cancel(): void {
        this.editComplete = false;
        this.routeForm.reset();
        this.edited.emit(this.editComplete);
      }

    public selectedDate(value: any, datepicker?: any) {
        datepicker.start = value.start;
        datepicker.end = value.end;
        this.dateRange.start = value.start;
        this.dateRange.end = value.end;
    }

    public selectedSingleDate(value: any, datepicker?: any) {
        datepicker.start = value.start;
        datepicker.end = value.end;
        this.singleDateRange.start = value.start;
        this.singleDateRange.end = value.end;
        this.singleDateRange.label = value.label;
        this.startDates.push(this.singleDateRange.start.valueOf());
        this.singleDateRange = {};
    }

    public removeDate(startdate) {
        this.startDates.splice(this.startDates.indexOf(startdate), 1);

    }
}

