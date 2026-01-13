import { AsyncPipe } from "@angular/common";
import { AfterViewInit, Component, inject, Input, TemplateRef, ViewChild } from "@angular/core";
import { Table } from "@features";
import { TableColumn } from "@types";
import { formatCreatedDate } from "@utils";
import { defer, Observable, of, switchMap } from "rxjs";
import { UserFacade } from "../../services";
import { UserViewModel } from "../../types";

@Component({
    selector: 'user-list',
    standalone: true,
    imports: [Table, AsyncPipe],
    templateUrl: './user-list.html'
})
export class UserList implements AfterViewInit{
    #userFacade = inject(UserFacade);
    @ViewChild('emailCell', { static: false })
    emailCell!: TemplateRef<{ $implicit: UserViewModel }>;
    
    @Input()
    searchValue?: Observable<string>;

    private readonly safeSearch$ = defer(() =>
        this.searchValue ?? of('')
    );

    readonly users$ = this.safeSearch$.pipe(
        switchMap(search => this.#userFacade.searchUsers(search)
        )
    );

    trackByUser = (_: number, user: UserViewModel) => user.userId;
    columns: TableColumn<UserViewModel>[] = [];

    ngAfterViewInit(): void {
        this.columns = [
            { key: 'emailId', label: 'Email', template: this.emailCell },
            { key: 'fullName', label: 'Full name', cell: u => u.fullName || '-' },
            { key: 'role', label: 'Role', cell: u => u.role },
            { key: 'projectName', label: 'Project', cell: u => u.projectName },
            {
                key: 'createdDate',
                label: 'Created',
                cell: u => formatCreatedDate(u.createdDate),
            }
        ];
    }
}
