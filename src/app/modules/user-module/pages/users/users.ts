import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Table } from '@features';
import { TableColumn } from '@types';
import { UserFacade, UsersViewModel, UserViewModel } from '@user-module';
import { Search } from 'app/features/search/search';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, Search, Table],
  templateUrl: './users.html',
})
export class Users implements AfterViewInit{
  #userFacade = inject(UserFacade);
  @ViewChild('emailCell', { static: true })
  emailCell!: TemplateRef<{ $implicit: UserViewModel }>;
  placeholder: string = "Search User";
  
  private search$ = new BehaviorSubject<string>("");
  users$: Observable<UsersViewModel> = this.search$.pipe(
    switchMap(value => this.#userFacade.searchUsers(value)),
  )
  trackByUser = (_: number, user: UserViewModel) => user.userId;
  columns: TableColumn<UserViewModel>[]  = [];

  ngAfterViewInit(): void { 
    this.columns = [
      { key: 'emailId', label: 'Email', template: this.emailCell},
      { key: 'fullName', label: 'Full name', cell: user => user.fullName || '-' },
      { key: 'role', label: 'Role', cell: user => user.role },
      { key: 'projectName', label: 'Project', cell: user => user.projectName },
      { key: 'createdDate', label: 'Created', cell: user => 
        new Date(user.createdDate).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      },
    ];
  }
  
  onSearch(value: string): void {
    this.search$.next(value);
  }

}
