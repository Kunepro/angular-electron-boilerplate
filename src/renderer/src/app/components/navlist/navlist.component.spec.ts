import { provideZonelessChangeDetection } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  provideRouter,
  Routes,
} from "@angular/router";
import { NavlistComponent } from './navlist.component';

const mockRoutes: Routes = [];

describe(
  'NavlistComponent',
  () => {
    let component: NavlistComponent;
    let fixture: ComponentFixture<NavlistComponent>;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports:   [ NavlistComponent ],
        providers: [
          provideRouter(mockRoutes),
          provideZonelessChangeDetection(),
        ],
      });
      
      fixture   = TestBed.createComponent(NavlistComponent);
      component = fixture.componentInstance;
    });
    
    it(
      'should create',
      () => {
        expect(component).toBeTruthy();
      },
    );
  },
);
