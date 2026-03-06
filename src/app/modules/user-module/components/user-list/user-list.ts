import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Table } from '@features/table/table';
import { TableColumn } from '@types';
import { UserFacade } from '@user-module/services/user.facade';
import { UsersViewModel, UserViewModel } from '@user-module/types/user.view.model';
import { formatCreatedDate } from '@utils';
import { Paging } from '@components/paging/paging';
import { combineLatest, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [Table, Paging],
  templateUrl: './user-list.html',
})
export class UserList {
  #userFacade = inject(UserFacade);

  emailCell = viewChild<TemplateRef<{ $implicit: UserViewModel }>>('emailCell');

  searchValue = input<string | undefined>('');
  pageNumber = signal<number>(1);
  pageSize = signal<number>(10);

  private readonly users$: Observable<UsersViewModel | undefined> = combineLatest([
    toObservable(this.searchValue),
    toObservable(this.pageNumber),
    toObservable(this.pageSize),
  ]).pipe(switchMap(([search, page, size]) => this.#userFacade.searchUsers(search, page, size)));

  constructor() {
    effect(() => {
      this.searchValue();
      this.pageNumber.set(1);
    });
  }
  readonly users = toSignal(this.users$, {
    initialValue: {
      data: [],
      totalRecords: 0,
      pageNumber: 0,
      pageSize: 0,
    },
  });

  trackByUser = (_: number, user: UserViewModel) => user.userId;

  columns = computed<TableColumn<UserViewModel>[]>(() => {
    const emailTpl = this.emailCell();

    if (!emailTpl) return [];

    return [
      { key: 'emailId', label: 'Email', template: emailTpl },
      { key: 'fullName', label: 'Full name', cell: (u) => u.fullName || '-' },
      { key: 'role', label: 'Role', cell: (u) => u.role },
      { key: 'projectName', label: 'Project', cell: (u) => u.projectName },
      {
        key: 'createdDate',
        label: 'Created',
        cell: (u) => formatCreatedDate(u.createdDate),
      },
    ];
  });

  onPageNumber(page: number) {
    this.pageNumber.set(page);
  }
}
