import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { IpcService } from './ipc.service';

describe('IpcService', () => {
  let service: IpcService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IpcService,
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(IpcService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
