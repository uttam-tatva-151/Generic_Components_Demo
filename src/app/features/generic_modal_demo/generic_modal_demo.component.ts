import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from "../../shared/components/modal/modal.component";

@Component({
  selector: 'app-generic_modal_demo',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './generic_modal_demo.component.html',
  styleUrls: ['./generic_modal_demo.component.css']
})
export class Generic_modal_demoComponent {
  modalOpen = false;
  modalPosition: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'center';
  modalSize: 'small' | 'medium' | 'large' | 'fullscreen' = 'medium';
  modalTitle = 'Supercharged Modal';
  modalIcon = 'fa-solid fa-rocket';
  modalLoading = false;
  okText = 'Confirm';
  cancelText = 'Dismiss';

  openModal(
    position: 'center' | 'left' | 'right' | 'top' | 'bottom',
    size: 'small' | 'medium' | 'large' | 'fullscreen',
    customTitle?: string
  ) {
    this.modalPosition = position;
    this.modalSize = size;
    if (customTitle) {
      this.modalTitle = customTitle;
      this.okText = customTitle === 'Session Timeout' ? 'Continue' : 'Confirm';
      this.cancelText = customTitle === 'Session Timeout' ? 'Dismiss' : 'Dismiss';
      this.modalIcon = customTitle === 'Session Timeout' ? 'fa-solid fa-hourglass-half' :
                       customTitle === 'Announcement' ? 'fa-solid fa-bullhorn' :
                       customTitle === 'Full Experience' ? 'fa-solid fa-maximize' :
                       customTitle === 'Survey' ? 'fa-solid fa-list-check' :
                       customTitle === 'Welcome!' ? 'fa-solid fa-hand-sparkles' :
                       customTitle === 'Quick Info' ? 'fa-solid fa-info-circle' :
                       'fa-solid fa-rocket';
    } else {
      this.modalTitle = this.getModalTitle(position, size);
      this.okText = 'Confirm';
      this.cancelText = 'Dismiss';
      this.modalIcon = 'fa-solid fa-rocket';
    }
    this.modalOpen = true;
  }

  getModalTitle(position: string, size: string) {
    if (size === 'fullscreen') return 'Center Fullscreen Modal';
    return `${position.charAt(0).toUpperCase() + position.slice(1)} ${size.charAt(0).toUpperCase() + size.slice(1)} Modal`;
  }

  handleOk() {
    this.modalLoading = true;
    setTimeout(() => {
      this.modalLoading = false;
      this.modalOpen = false;
      alert('Confirmed!');
    }, 900);
  }

  handleCancel() {
    this.modalOpen = false;
    alert('Dismissed!');
  }

  handleClosed() {
    this.modalOpen = false;
  }

  handleAfterOpen() {}
  handleAfterClose() {}
}
