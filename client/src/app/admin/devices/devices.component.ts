import { DeviceEditService } from './../../core/device-edit.service';
import { Device } from './../../models/deviceModel';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { NavbarService } from 'src/app/core/navbar.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public formGroup: FormGroup;

    private editedRowIndex: number;

    constructor(private readonly editService: DeviceEditService,
        private readonly nav: NavbarService, private zone: NgZone) {
            this.editService.subscribe((state) => {
                this.zone.run(() => {
                });
            });
    }

    public ngOnInit(): void {
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));
        this.editService.read();
    }
    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.read();
    }

    public addHandler({sender}) {
        this.closeEditor(sender);

        this.formGroup = new FormGroup({
            'name': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
            'longitude': new FormControl('', [Validators.required, Validators.min(-180), Validators.max(180)]),
            'latitude': new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)]),
        });
        sender.addRow(this.formGroup);
    } 

    public editHandler({sender, rowIndex, dataItem}) {
        this.closeEditor(sender);
        this.formGroup = new FormGroup({
            'id': new FormControl(dataItem.id),
            'name': new FormControl(dataItem.name, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
            'longitude': new FormControl(dataItem.longitude, [Validators.required, Validators.min(-180), Validators.max(180)]),
            'latitude': new FormControl(dataItem.latitude, [Validators.required, Validators.min(-90), Validators.max(90)]),
        });
        this.editedRowIndex = rowIndex;
        sender.editRow(rowIndex, this.formGroup);
    }

    public cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({sender, rowIndex, formGroup, isNew}) {
        const device: Device = formGroup.value;
        this.editService.save(device, isNew);
        sender.closeRow(rowIndex);
    }

    public removeHandler({dataItem}) {
        this.editService.remove(dataItem);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }
 }

