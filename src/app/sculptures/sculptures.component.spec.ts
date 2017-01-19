/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SculpturesComponent } from './sculptures.component';

describe('SculpturesComponent', () => {
  let component: SculpturesComponent;
  let fixture: ComponentFixture<SculpturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SculpturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SculpturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
