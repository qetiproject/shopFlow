import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserViewModel } from '@user-module';

@Component({
  selector: 'user-item',
  imports: [DatePipe],
  templateUrl: './user-item.html',
})
export class UserItem {
  @Input({required: true}) user!: UserViewModel;
}
