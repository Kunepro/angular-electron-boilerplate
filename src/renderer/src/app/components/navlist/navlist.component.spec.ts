import { provideZonelessChangeDetection } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { NavlistComponent } from './navlist.component';

describe(
  'NavlistComponent',
  () => {
    let component: NavlistComponent;
    let fixture: ComponentFixture<NavlistComponent>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports:   [ NavlistComponent ], // Use imports for standalone component
        providers: [
          provideZonelessChangeDetection(), // Correct provider
        ],
      });
      
      fixture   = TestBed.createComponent(NavlistComponent);
      component = fixture.componentInstance;
      // Remove fixture.detectChanges() unless specifically needed
    });
    
    it(
      'should create',
      () => {
        expect(component).toBeTruthy();
      },
    );
  },
);
