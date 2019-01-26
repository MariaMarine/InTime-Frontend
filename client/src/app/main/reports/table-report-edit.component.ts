import { HttpErrorResponse } from '@angular/common/http';
import { Device } from 'src/app/models/deviceModel';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NotificatorService } from 'src/app/core/notification.service';
import { RequesterService } from 'src/app/core/reqester.service';
import { Table } from 'src/app/models/tableModel';

@Component({
    selector: 'app-table-report-edit',
    templateUrl: './table-report-edit.component.html'
  })
  export class TableReportEditComponent implements OnInit {

    public devices: Device [];
    public routeForm: FormGroup;
    @Output() public edited = new EventEmitter<boolean>();
    public editComplete = false;
    @Input() public modifyMode: boolean;

    @Input() public currentTable: Table;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly notificationService: NotificatorService,
        private readonly http: RequesterService,
    ) {}
    ngOnInit(): void {
        this.devices = this.route.snapshot.data['devices'];
        const name = this.formBuilder.control(this.modifyMode ? `${this.currentTable.name}`
            : '', [Validators.required]);
        const period = this.formBuilder.control(this.modifyMode ? `${this.currentTable.period }`
            : '', [Validators.required, Validators.min(1)]);
        const deviceNames = this.formBuilder.control('', [Validators.required]);
        this.routeForm = this.formBuilder.group({
            name,
            period,
            deviceNames,
        });
    }

    public createRoute() {
        const action = this.modifyMode ? `updated` : `created`;
        const request = this.modifyMode ? this.http.put
            (`http://localhost:3000/table-reports/${this.currentTable.id}`, JSON.stringify(this.routeForm.value))
            : this.http.post('http://localhost:3000/table-reports', JSON.stringify(this.routeForm.value));
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

    public cancel(): void {
        this.editComplete = false;
        this.routeForm.reset();
        this.edited.emit(this.editComplete);
      }
  }
