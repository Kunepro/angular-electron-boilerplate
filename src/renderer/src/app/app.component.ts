import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { NavlistComponent } from './components/navlist/navlist.component';
import { IpcService } from './ipc.service';

@Component({
  selector:        'app-root',
  templateUrl:     './app.component.html',
  styleUrls:       [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:      true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    NavlistComponent,
  ],
})
export class AppComponent {
  title              = 'angular-electron-sqlite-boilerplate';
  private ipcService = inject(IpcService);
  
  clickDevTools() {
    this.ipcService.openDevTools();
  }
}
