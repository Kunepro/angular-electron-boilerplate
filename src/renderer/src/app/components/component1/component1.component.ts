import {
  Component,
  OnInit,
  NgZone,
  inject,
} from '@angular/core';
import { IpcService } from 'src/app/ipc.service';

@Component({
    selector: 'app-component1',
    templateUrl: './component1.component.html',
    styleUrls: ['./component1.component.css'],
    standalone: false
})
export class Component1Component implements OnInit {
  arch = '-';
  hostname = '-';
  platform = '-';
  release = '-';
  private ipcService = inject(IpcService);
  private ngZone = inject(NgZone);

  ngOnInit() {
    this.ipcService.getSystemInfoAsync()
      .subscribe(systemInfo => {
        this.ngZone.run(() => {
          this.arch = systemInfo.Arch;
          this.hostname = systemInfo.Hostname;
          this.platform = systemInfo.Platform;
          this.release = systemInfo.Release;
        });
      });
  }
}
