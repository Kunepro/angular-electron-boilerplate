import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Component2Component } from './component2.component';

describe('Component2Component', () => {
  let component: Component2Component;
  let fixture: ComponentFixture<Component2Component>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Component2Component],
      providers: [
        provideZonelessChangeDetection(),
      ],
    });
    
    fixture = TestBed.createComponent(Component2Component);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
