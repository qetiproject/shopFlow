import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

export function setupComponent<T>(component: Type<T>): { fixture: ComponentFixture<T>; instance: T } {
  const fixture = TestBed.createComponent(component);
  const instance = fixture.componentInstance;
  fixture.detectChanges();
  return { fixture, instance };
}
