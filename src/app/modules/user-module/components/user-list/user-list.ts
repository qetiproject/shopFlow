import { AsyncPipe } from "@angular/common";
import { Component, inject, Input, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Table } from "@features";
import { TableColumn } from "@types";
import { defer, Observable, of, switchMap } from "rxjs";
import { UserFacade } from "../../services";
import { UserViewModel } from "../../types";

@Component({
    selector: 'user-list',
    standalone: true,
    imports: [Table, AsyncPipe],
    templateUrl: './user-list.html'
})
export class UserList implements OnInit{
    
    #userFacade = inject(UserFacade);
    @ViewChild('emailCell', { static: true })
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

    getColumns(): TableColumn<UserViewModel>[]{
        return this.columns = [
            { key: 'emailId', label: 'Email', template: this.emailCell },
            { key: 'fullName', label: 'Full name', cell: u => u.fullName || '-' },
            { key: 'role', label: 'Role', cell: u => u.role },
            { key: 'projectName', label: 'Project', cell: u => u.projectName },
            {
            key: 'createdDate',
            label: 'Created',
            cell: u =>
                new Date(u.createdDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                }),
            },
        ];
    }
    ngOnInit(): void {
       this.getColumns();
    }

}