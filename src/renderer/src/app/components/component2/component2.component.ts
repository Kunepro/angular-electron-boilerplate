import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

@Component({
  selector:    'app-component2',
  templateUrl: './component2.component.html',
  styleUrls:   [ './component2.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:  true,
})
export class Component2Component {
}
