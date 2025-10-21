import {
  Component,
  inject,
} from '@angular/core';
import { IpcService } from './ipc.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'angular-electron-boilerplate';
  private ipcService = inject(IpcService);

  clickDevTools() {
    this.ipcService.openDevTools();
  }
}
