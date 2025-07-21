import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SnackbarAction, SnackbarData } from '../../../core/modals/snackbar-modal';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit, OnDestroy {
  @Input() position: SnackbarData['position'] = 'bottom-right';
  @Input() maxStack = 5;

  snackbars: SnackbarData[] = [];

  // Timers for auto-close & progress
  private autoCloseStartTime: { [id: string]: number } = {};
  private autoCloseDuration: { [id: string]: number } = {};
  private autoCloseRemaining: { [id: string]: number } = {};
  private autoCloseTimer: { [id: string]: any } = {};

  constructor(private snackbarService: SnackbarService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.snackbarService.snackbars.subscribe(list => {
      this.snackbars = this.applyStack(list.filter(s => (s.position || 'bottom-right') === this.position));
      this.setupTimers();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    Object.values(this.autoCloseTimer).forEach(clearTimeout);
  }

  applyStack(list: SnackbarData[]) {
    if (list.length <= this.maxStack) return list;
    return list.slice(list.length - this.maxStack);
  }

  setupTimers() {
    for (const s of this.snackbars) {
      if (s.autoClose && !this.autoCloseTimer[s.id!]) {
        const duration = s.duration || 4000;
        this.autoCloseStartTime[s.id!] = Date.now();
        this.autoCloseDuration[s.id!] = duration;
        this.autoCloseRemaining[s.id!] = duration;
        this.autoCloseTimer[s.id!] = setTimeout(() => {
          this.dismiss(s.id!);
        }, duration);
      }
    }
  }

  dismiss(id: string) {
    this.snackbarService.dismiss(id);
    if (this.autoCloseTimer[id]) {
      clearTimeout(this.autoCloseTimer[id]);
      delete this.autoCloseTimer[id];
    }
    delete this.autoCloseStartTime[id];
    delete this.autoCloseDuration[id];
    delete this.autoCloseRemaining[id];
  }

  onAction(snackbar: SnackbarData, action: SnackbarAction) {
    if (action.action) action.action();
    this.dismiss(snackbar.id!);
  }

  pauseAutoClose(id: string) {
    if (this.autoCloseTimer[id]) {
      clearTimeout(this.autoCloseTimer[id]);
      this.autoCloseRemaining[id] -= Date.now() - this.autoCloseStartTime[id];
      this.autoCloseTimer[id] = null;
    }
  }

  resumeAutoClose(id: string) {
    const s = this.snackbars.find(sb => sb.id === id);
    if (s && s.autoClose && !this.autoCloseTimer[id] && this.autoCloseRemaining[id] > 0) {
      this.autoCloseStartTime[id] = Date.now();
      this.autoCloseTimer[id] = setTimeout(() => {
        this.dismiss(id);
      }, this.autoCloseRemaining[id]);
    }
  }

  getProgressPercent(s: SnackbarData): number {
    const id = s.id!;
    if (!s.autoClose || !this.autoCloseDuration[id]) return 0;
    // If auto-close timer has run out or snackbar is being dismissed, fill bar
    if (!this.autoCloseTimer[id] && this.autoCloseRemaining[id] <= 0) return 100;
    // If running, show real-time progress
    if (this.autoCloseTimer[id]) {
      const elapsed = Date.now() - this.autoCloseStartTime[id];
      const percent = 100 * (elapsed / this.autoCloseDuration[id]);
      return Math.min(percent, 100);
    }
    // If paused, show paused progress
    if (this.autoCloseRemaining[id]) {
      const percent = 100 * (1 - this.autoCloseRemaining[id] / this.autoCloseDuration[id]);
      return Math.min(percent, 100);
    }
    return 0;
  }

  getProgressStyle(s: SnackbarData) {
    const id = s.id!;
    const percent = this.getProgressPercent(s);
    let transition = 'none';
    // If running, animate to 100% over remaining duration
    if (this.autoCloseTimer[id]) {
      const ms = this.autoCloseRemaining[id] || this.autoCloseDuration[id];
      transition = `width ${ms / 1000}s linear`;
    }
    return {
      width: percent + '%',
      transition
    };
  }

  toggleAccordion(snackbar: SnackbarData) {
    snackbar.expanded = !snackbar.expanded;
  }
}