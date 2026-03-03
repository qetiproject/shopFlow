import { KeyValue, KeyValuePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { ErrorMessagePipe } from "..";

@Component({
    selector: 'app-input-error',
    standalone: true,
    imports: [ErrorMessagePipe, KeyValuePipe],
    template: `
       <ul class="mt-1 text-sm text-red-600 list-disc list-inside">
         @for (error of errors() | keyvalue; track trackByFn($index, error)) {
           <li>
             {{ error.key | errorMessage: error.value }}
           </li>
         }
       </ul>
       `,
    styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorComponent{

    readonly errors = input<ValidationErrors | null | undefined>(null);

    trackByFn(index: number, item: KeyValue<string, any>) {
        return item.key
    }


}