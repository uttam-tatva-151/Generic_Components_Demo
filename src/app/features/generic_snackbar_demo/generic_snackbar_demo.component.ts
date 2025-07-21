import { Component } from '@angular/core';
import { SnackbarData } from '../../core/modals/snackbar-modal';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';
import { SnackbarService } from '../../core/services/snackbar.service';
import { CommonModule } from '@angular/common';

interface SnackbarDemoCase {
  label: string;
  config: SnackbarData;
}

@Component({
  selector: 'app-generic-snackbar-demo',
  templateUrl: './generic_snackbar_demo.component.html',
  styleUrls: ['./generic_snackbar_demo.component.css'],
  standalone: true,
  imports: [SnackbarComponent,CommonModule]
})
export class Generic_snackbar_demoComponent {
  demoCases: SnackbarDemoCase[] = [
    {
      label: 'Basic Info',
      config: {
        title: 'Info snackbar',
        message: 'This is a simple notification.',
        status: 'info',
        icon: 'fa-solid fa-info-circle',
        position: 'top-right',
        autoClose: true,
        showClose: true
      }
    },
    {
      label: 'Success with Action',
      config: {
        title: 'Success!',
        message: 'Your change was saved.',
        status: 'success',
        icon: 'fa-solid fa-circle-check',
        position: 'bottom-left',
        autoClose: true,
        duration: 3000,
        actions: [
          { label: 'Undo', action: () => alert('Undo!'), color: '#fff', icon: 'fa-solid fa-rotate-left' }
        ],
        showClose: true
      }
    },
    {
      label: 'Warning with Details',
      config: {
        title: 'Warning',
        message: 'Check your settings.',
        details: 'Some settings are not optimal. See details.',
        status: 'warning',
        icon: 'fa-solid fa-exclamation-triangle',
        position: 'top-center',
        autoClose: false,
        showClose: true
      }
    },
    {
      label: 'Error with Link',
      config: {
        title: 'Error',
        message: 'Upload failed.',
        status: 'error',
        icon: 'fa-solid fa-xmark',
        position: 'bottom-center',
        link: { url: 'https://example.com/help', text: 'Get Help' },
        autoClose: true,
        duration: 8000,
        showClose: true
      }
    },
    {
      label: 'Avatar & Subtitle',
      config: {
        title: 'Message from Jane',
        subtitle: '2 minutes ago',
        message: 'Hey, are you available for a call?',
        avatarUrl: 'https://i.pravatar.cc/40?img=5',
        status: 'info',
        position: 'top-left',
        autoClose: true,
        showClose: true
      }
    },
    {
      label: 'Progress Upload (Animated)',
      config: {
        title: 'Uploading...',
        message: 'File upload is in progress.',
        status: 'custom',
        icon: 'fa-solid fa-cloud-arrow-up',
        position: 'bottom-right',
        autoClose: true,
        duration: 3500,
        showClose: true
      }
    },
    {
      label: 'Accordion Details',
      config: {
        title: 'Show More Details',
        message: 'Click "Show Details" for extra info.',
        status: 'info',
        position: 'top-center',
        details: 'This is the extra detail shown in an accordion!',
        showDetailsBtn: true,
        autoClose: false,
        showClose: true
      }
    },
    {
      label: 'Manual Dismiss Only',
      config: {
        title: 'Manual Close',
        message: 'This snackbar will stay until you close it.',
        status: 'info',
        position: 'center',
        autoClose: false,
        showClose: true
      }
    },
    {
      label: 'No Title, Just Message',
      config: {
        message: 'This is a minimal snackbar.',
        status: 'success',
        position: 'top-center',
        autoClose: true,
        showClose: true
      }
    },
    {
      label: 'Many Actions',
      config: {
        title: 'Multiple Actions',
        message: 'Choose what to do next.',
        status: 'custom',
        position: 'bottom-left',
        actions: [
          { label: 'Accept', action: () => alert('Accepted!'), color: '#43a047', icon: 'fa-solid fa-check' },
          { label: 'Dismiss', action: () => alert('Dismissed!'), color: '#e53935', icon: 'fa-solid fa-xmark' }
        ],
        showClose: true,
        autoClose: false
      }
    }
  ];

  constructor(private snackbar: SnackbarService) {}

  showDemo(demo: SnackbarDemoCase) {
    // For progress upload, autoClose and let the progress bar work via CSS
    this.snackbar.show(demo.config);
  }
}