import { Component} from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generic_buttons_demo',
  templateUrl: './generic_buttons_demo.component.html',
  styleUrls: ['./generic_buttons_demo.component.css'],
  imports: [ButtonComponent,CommonModule]
})
export class Generic_buttons_demoComponent {

  isDeleting = false;

  onSave() {
    alert('Save clicked!');
  }

  onDownload() {
    alert('Download started!');
  }

  onDelete() {
    this.isDeleting = true;
    setTimeout(() => {
      this.isDeleting = false;
      alert('Deleted!');
    }, 1500);
  }

  onConfirm() {
    alert('Confirmed!');
  }
  onFire() {
    alert('🔥 Fire action initiated!');
  }
}
