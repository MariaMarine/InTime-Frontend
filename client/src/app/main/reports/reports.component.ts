import { Component, OnInit, OnChanges, Input, SimpleChanges, AfterViewInit, ViewChild } from '@angular/core';
import { RequesterService } from 'src/app/core/reqester.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/tableModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificatorService } from 'src/app/core/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

  public tableReports: Table[];
  public createMode: boolean;
  public routeForm: FormGroup;

  public constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificatorService,
    private readonly http: RequesterService,
  ) {}

  public ngOnInit(): void {
    this.createMode = false;
    const data = this.route.snapshot.data['reports'];
    this.extractReports(data);
    const name = this.formBuilder.control('', [Validators.required]);
    const period = this.formBuilder.control('', [Validators.required, Validators.min(1)]);
    const deviceNames = this.formBuilder.control(['two', 'three'], []);
    this.routeForm = this.formBuilder.group({
        name,
        period,
        deviceNames,
    });
  }
  public createRoute() {
    this.http.post('http://localhost:3000/table-reports', JSON.stringify(this.routeForm.value))
    .subscribe(() => {
        this.notificationService.show('Report added!', 'success');
        this.createMode = false;
        this.routeForm.reset();
        return this.http.get('http://localhost:3000/table-reports').subscribe((res: Table[]) => this.tableReports = res);
        },
        (err: HttpErrorResponse) => {
            this.notificationService.show('Error!', 'error');
        });
  }
  public cancel(): void {
    this.createMode = false;
  }

  private extractReports(data: any): void {
    this.tableReports = data;
  }
}
