import { Component, computed, inject, input, TemplateRef, viewChild } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { Table } from "@features";
import { TableColumn } from "@types";
import { UserFacade, UsersViewModel, UserViewModel } from "@user-module";
import { formatCreatedDate } from "@utils";
import { Observable, switchMap } from "rxjs";

@Component({
    selector: 'user-list',
    standalone: true,
    imports: [Table],
    templateUrl: './user-list.html'
})
export class UserList {
    #userFacade = inject(UserFacade);

    emailCell = viewChild<TemplateRef<{ $implicit: UserViewModel }>>('emailCell');
    
    searchValue = input<string | undefined>('');

    private readonly users$: Observable<UsersViewModel | undefined> = toObservable(this.searchValue).pipe(
        switchMap(search => this.#userFacade.searchUsers(search))
    );
    
    readonly users = toSignal(
        this.users$,
        { initialValue: 
            { 
                data: [], 
                totalRecords: 0,
                pageNumber: 0,
                pageSize: 0
            }
        }
    );

    trackByUser = (_: number, user: UserViewModel) => user.userId;

    columns = computed<TableColumn<UserViewModel>[]>(() => {
        const emailTpl = this.emailCell();

        if (!emailTpl) return [];

        return [
            { key: 'emailId', label: 'Email', template: emailTpl },
            { key: 'fullName', label: 'Full name', cell: u => u.fullName || '-' },
            { key: 'role', label: 'Role', cell: u => u.role },
            { key: 'projectName', label: 'Project', cell: u => u.projectName },
            {
                key: 'createdDate',
                label: 'Created',
                cell: u => formatCreatedDate(u.createdDate),
            }
        ]
    })

}