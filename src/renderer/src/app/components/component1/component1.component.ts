import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { IpcService } from 'src/app/ipc.service';

@Component({
  selector:    'app-component1',
  templateUrl: './component1.component.html',
  styleUrls:   [ './component1.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:  true,
})
export class Component1Component implements OnInit {
  // Use signals instead of regular properties
  arch = signal('-');
  hostname = signal('-');
  platform = signal('-');
  release = signal('-');
  
  private ipcService = inject(IpcService);
  
  ngOnInit() {
    this.ipcService.getSystemInfoAsync()
      .subscribe(systemInfo => {
        this.arch.set(systemInfo.Arch);
        this.hostname.set(systemInfo.Hostname);
        this.platform.set(systemInfo.Platform);
        this.release.set(systemInfo.Release);
      });
  }
}
