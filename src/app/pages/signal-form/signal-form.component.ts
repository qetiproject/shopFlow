import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  apply,
  email,
  form,
  FormField,
  minLength,
  required,
  schema,
  Schema,
} from '@angular/forms/signals';
import { StatefulInput } from './stateful-input';

const nameSchema: Schema<string> = schema((path) => {
  required(path, { message: 'First Name is required' });
  minLength(path, 3, { message: 'Too short' });
});

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  notifyByEmail: boolean;
}
@Component({
  selector: 'app-signal-form',
  standalone: true,
  imports: [FormField, CommonModule, StatefulInput],
  templateUrl: './signal-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormComponent {
  protected readonly user = signal<User>({
    firstName: '',
    lastName: '',
    email: '',
    notifyByEmail: false,
  });

  protected readonly signupForm = form(this.user, (path) => {
    apply(path.firstName, nameSchema);
    apply(path.lastName, nameSchema);

    email(path.email, { message: 'This is invalid email' });

    required(path.email, {
      when: ({ valueOf }) => valueOf(path.notifyByEmail),
      message: 'This field is required...',
    });
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.signupForm().value(), 'value');
  }
}
