import { AfterViewInit, Component, inject, input, TemplateRef, ViewChild } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { Table } from "@features";
import { TableColumn } from "@types";
import { formatCreatedDate } from "@utils";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { UserFacade } from "../../services";
import { UsersViewModel, UserViewModel } from "../../types";

@Component({
    selector: 'user-list',
    standalone: true,
    imports: [Table],
    templateUrl: './user-list.html'
})
export class UserList implements AfterViewInit{
    #userFacade = inject(UserFacade);
    @ViewChild('emailCell', { static: false })
    emailCell!: TemplateRef<{ $implicit: UserViewModel }>;

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
