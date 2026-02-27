import { TemplateRef } from '@angular/core';

interface TableColumnStrict<T> {
  key: keyof T;
  label: string;
  cell?: (row: T) => string;
  template?: TemplateRef<{ $implicit: T }>;
}

interface TableColumnFlexible<T> {
  key: string;
  label: string;
  cell?: (row: T) => string;
  template?: TemplateRef<{ $implicit: T }>;
}

export type TableColumn<T> = TableColumnStrict<T> | TableColumnFlexible<T>;

export interface TableId {
  id?: string | number;
  userId?: string | number;
}
