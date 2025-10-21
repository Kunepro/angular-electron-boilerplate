import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-navlist',
  templateUrl: './navlist.component.html',
  styleUrls: [ './navlist.component.css' ],
  standalone: false,
})
export class NavlistComponent {
  
  @Output() sidenavClose = new EventEmitter();
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}
