import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  provideRouter,
  Routes,
} from '@angular/router';
import { AppComponent } from './app.component';

const mockRoutes: Routes = [];

describe(
  'AppComponent',
  () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports:   [ AppComponent ],
        providers: [
          provideRouter(mockRoutes),
          provideZonelessChangeDetection(),
        ],
      });
    });
    
    it(
      'should create the app',
      () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app     = fixture.componentInstance; // Use componentInstance directly
        expect(app).toBeTruthy();
      },
    );
    
    it(
      `should have as title 'angular-electron-sqlite-boilerplate'`,
      () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app     = fixture.componentInstance;
        expect(app.title).toEqual('angular-electron-sqlite-boilerplate');
      },
    );
  },
);
