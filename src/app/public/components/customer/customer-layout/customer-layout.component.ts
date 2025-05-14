import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterOutlet, ToolBarComponent],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

}
