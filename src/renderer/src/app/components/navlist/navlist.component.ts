import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MatListItem,
  MatNavList,
} from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector:        'app-navlist',
  templateUrl:     './navlist.component.html',
  styleUrls:       [ './navlist.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:      true,
  imports:         [
    RouterLink,
    MatNavList,
    MatListItem,
    MatIconModule,
  ],
})
export class NavlistComponent {
  @Output() sidenavClose = new EventEmitter();
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}
