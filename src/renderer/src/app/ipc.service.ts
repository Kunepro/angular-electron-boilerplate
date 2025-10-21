import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DtoSystemInfo } from '../../../ipc-dtos/dtosysteminfo';

@Injectable({
  providedIn: 'root',
})
export class IpcService {
  openDevTools() {
    window.api.electronIpcSend('dev-tools');
  }
  
  getSystemInfoAsync(): Observable<DtoSystemInfo> {
    return new Observable(subscriber => {
      window.api.electronIpcOnce(
        'systeminfo',
        (event, arg) => {
          const systemInfo: DtoSystemInfo = DtoSystemInfo.deserialize(arg);
          subscriber.next(systemInfo);
          subscriber.complete();
        },
      );
      window.api.electronIpcSend('request-systeminfo');
    });
  }
}
