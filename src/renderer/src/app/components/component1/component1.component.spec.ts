import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Component1Component } from './component1.component';

describe('Component1Component', () => {
  let component: Component1Component;
  let fixture: ComponentFixture<Component1Component>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Component1Component],
      providers: [
        provideZonelessChangeDetection(),
      ],
    });
    
    fixture = TestBed.createComponent(Component1Component);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
