import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';


interface DemoSection {
  label: string;
  route: string;
  faClass?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Generic Components Demo';

  demoSections: DemoSection[] = [
    { label: 'Buttons', route: '/button-demo', faClass: 'fa-solid fa-hand-pointer' },
    { label: 'Inputs', route: '/input-demo', faClass: 'fa-solid fa-pen-to-square' },
    { label: 'Cards', route: '/card-demo', faClass: 'fa-solid fa-id-card' },
    { label: 'Modals', route: '/modal-demo', faClass: 'fa-solid fa-window-restore' },
    { label: 'Tables', route: '/table-demo', faClass: 'fa-solid fa-table' },
    { label: 'Snackbar', route: '/snackbar-demo', faClass: 'fa-solid fa-circle-radiation' },
    // more sections...
  ];
}
