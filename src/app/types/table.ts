import { TemplateRef } from "@angular/core";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  cell?: (row: T) => string;
  template?: TemplateRef<{ $implicit: T }>;
}