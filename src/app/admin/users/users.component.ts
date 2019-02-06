import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { NavbarService } from 'src/app/core/navbar.service';
import { AuthService } from '../../core/auth.service';
import { UserService } from '../../core/user.service';
import { NotificatorService } from '../../core/notification.service';
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
        private readonly router: Router) {

    }
    public ngOnInit(): void {
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));
        this.editService.read();
    }
    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.read();
    }

    public ngOnDestroy(): void {
        this.editService.reset();
    }

    public addHandler({sender}) {
        this.router.navigate(['/register']);
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

