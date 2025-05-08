import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';

@Component({
  selector: 'app-worker-layout',
  imports: [RouterOutlet, ToolBarComponent],
  templateUrl: './worker-layout.component.html',
  styleUrl: './worker-layout.component.css'
})
export class WorkerLayoutComponent {

}
