import { Type } from "@angular/core";
import { TestBed } from "@angular/core/testing";

export function setupComponent<T>(component: Type<T>) {
  const fixture = TestBed.createComponent(component);
  const comptInstance = fixture.componentInstance;
  fixture.detectChanges();
  return { fixture, comptInstance };
}