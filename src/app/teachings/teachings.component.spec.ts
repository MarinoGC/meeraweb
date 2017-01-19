/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeachingsComponent } from './teachings.component';

describe('TeachingsComponent', () => {
  let component: TeachingsComponent;
  let fixture: ComponentFixture<TeachingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
