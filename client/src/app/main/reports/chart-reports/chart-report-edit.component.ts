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

    constructor(
        private readonly route: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly notificationService: NotificatorService,
        private readonly http: RequesterService,
    ) {}
    ngOnInit(): void {
        this.devices = this.route.snapshot.data['devices'];

        this.value = this.modifyMode ? this.currentChart.startDates.map (date => date.dateInMilliseconds) : [];
        const name = this.formBuilder.control(this.modifyMode ? `${this.currentChart.name}`
            : '', [Validators.required, Validators.minLength(3)]);
        const origin = this.formBuilder.control(this.modifyMode ? this.currentChart.origin
            : '', [Validators.required]);
        const destination = this.formBuilder.control(this.modifyMode ? this.currentChart.destination
            : '', [Validators.required]);
        const periodInMilliseconds = this.formBuilder.control(this.modifyMode ? `${this.currentChart.periodInMilliseconds }`
            : '', []);
        const startDates = this.formBuilder.control([...this.value], []);
        this.routeForm = this.formBuilder.group({
            name,
            origin,
            destination,
            periodInMilliseconds,
            startDates,
        });
    }

    public createRoute() {

        console.log(this.routeForm.value);
        if (this.originUpdate) {
            this.routeForm.value.origin = this.originUpdate;
        }
        if (this.destinationUpdate) {
            this.routeForm.value.destination = this.destinationUpdate;
        }
        if (this.routeForm.value.destination.name === this.routeForm.value.origin.name) {
            this.notificationService.show(`Origin can't be the same as destination!`, 'error');
        } else {
        this.routeForm.value.periodInMilliseconds = 16000000;
        this.routeForm.value.startDates = [ 1548583000000,  1548583006000 ];
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
        console.log(event);
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
  }
