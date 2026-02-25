// import { TemplateRef } from '@angular/core';

import { TemplateRef } from '@angular/core';

// export interface TableColumn<T> {
//   key: keyof T;
//   label: string;
//   cell?: (row: T) => string;
//   template?: TemplateRef<{ $implicit: T }>;
// }

export type TableColumn<T, TValue = string | number | Date> =
  | {
      key: string;
      label: string;
      cell: (row: T) => TValue;
      template?: never;
    }
  | {
      key: string;
      label: string;
      template: TemplateRef<{ $implicit: T }>;
      cell?: never;
    };
