import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { NavbarService } from 'src/app/core/navbar.service';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../../core/user.service';
import { NotificatorService } from '../../core/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../../models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit, OnDestroy {

    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public formGroup: FormGroup;

    private editedRowIndex: number;

    constructor(
        private readonly authService: AuthService,
        private readonly editService: UserService,
        private readonly nav: NavbarService,
        private readonly notificationService: NotificatorService,
        private readonly router: Router, private zone: NgZone) {
            this.editService.subscribe((state) => {
                this.zone.run(() => {
                });
            });
    }

    public ngOnDestroy(): void {
        this.nav.hide()
    }

    public ngOnInit(): void {
        this.nav.show();
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));
        this.editService.read();
    }
    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.read();
    }

    public addHandler({sender}) {
        this.router.navigate(['/register']);
        // this.closeEditor(sender);

        // this.formGroup = new FormGroup({
        //     'email': new FormControl('', [Validators.required, Validators.email]),
        //     'password': new FormControl('', Validators.required),
        // });
        // sender.addRow(this.formGroup);
    }


    public cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({sender, rowIndex, formGroup}) {
        const device: UserModel = formGroup.value;
        this.editService.save(device);
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

