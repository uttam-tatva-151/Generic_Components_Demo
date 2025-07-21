import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';

type ModalPosition = 'center' | 'left' | 'right' | 'top' | 'bottom';
type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() title?: string;
  @Input() icon?: string;
  @Input() width: string = '420px';
  @Input() height?: string;
  @Input() minWidth: string = '280px';
  @Input() maxWidth: string = '96vw';
  @Input() minHeight?: string;
  @Input() maxHeight: string = '90vh';
  @Input() showClose = true;
  @Input() showFooter = true;
  @Input() okText: string = 'OK';
  @Input() cancelText: string = 'Cancel';
  @Input() closeOnOverlay = true;
  @Input() closeOnEsc = true;
  @Input() loading = false;
  @Input() disableOk = false;
  @Input() disableCancel = false;
  @Input() customClass?: string;
  @Input() customStyle?: { [key: string]: string };
  @Input() headerClass?: string;
  @Input() footerClass?: string;
  @Input() overlayClass?: string;
  @Input() overlayStyle?: { [key: string]: string };
  @Input() animation: 'fade' | 'slide' | 'zoom' | 'none' = 'fade';
  @Input() focusSelector?: string;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledBy?: string;
  @Input() ariaDescribedBy?: string;
  @Input() scrollableContent = true;
  @Input() noPaddingContent = false;
  @Input() trapFocus = true;
  @Input() showHeader = true;
  @Input() showActions = true;
  @Input() position: ModalPosition = 'center';
  @Input() size: ModalSize = 'medium';

  @Output() closed = new EventEmitter<void>();
  @Output() ok = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() afterOpen = new EventEmitter<void>();
  @Output() afterClose = new EventEmitter<void>();

  @ViewChild('modalDialog') modalDialog?: ElementRef;
  @ViewChild('mainContent') mainContent?: ElementRef;

  private previouslyFocusedElement: HTMLElement | null = null;
  private clickInBody = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.isOpen) this.openModal();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (changes['isOpen'].currentValue) {
        this.openModal();
      } else {
        this.restoreFocus();
        this.afterClose.emit();
      }
    }
  }

  get mergedModalStyles(): { [key: string]: string } {
    let styles: { [key: string]: string } = {
      minWidth: this.minWidth,
      maxWidth: this.maxWidth,
      minHeight: this.minHeight || 'auto',
      maxHeight: this.maxHeight,
      ...(this.customStyle || {})
    };

    if (this.size === 'small') {
      styles['width'] = '320px';
      styles['height'] = this.height || 'auto';
    } else if (this.size === 'large') {
      styles['width'] = '700px';
      styles['height'] = this.height || 'auto';
    } else if (this.size === 'fullscreen') {
      styles['width'] = '100vw';
      styles['height'] = '100vh';
      styles['minWidth'] = '100vw';
      styles['minHeight'] = '100vh';
      styles['maxWidth'] = '100vw';
      styles['maxHeight'] = '100vh';
    } else {
      styles['width'] = this.width;
      styles['height'] = this.height || 'auto';
    }

    // Off-canvas positions override width/height
    if (this.position === 'left' || this.position === 'right') {
      styles['height'] = '100vh';
      styles['maxHeight'] = '100vh';
      styles['minHeight'] = '100vh';
      styles['width'] = styles['width'] || '340px';
    }
    if (this.position === 'top' || this.position === 'bottom') {
      styles['width'] = '100vw';
      styles['maxWidth'] = '100vw';
      styles['minWidth'] = '100vw';
      styles['height'] = styles['height'] || '220px';
    }
    return styles;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    if (!this.isOpen) return;
    if (this.closeOnEsc && event.key === 'Escape') {
      this.close();
    }
    if (this.trapFocus && event.key === 'Tab') {
      this.maintainFocus(event);
    }
  }

  onOverlayClick(event: MouseEvent) {
    if (!this.closeOnOverlay) return;
    if (this.modalDialog && !this.modalDialog.nativeElement.contains(event.target)) {
      this.close();
      return;
    }
  }

  onBodyClick(event: MouseEvent) {
    this.clickInBody = true;
    event.stopPropagation();
  }

  onHeaderFooterClick(event: MouseEvent) {
    if (this.closeOnOverlay && !this.clickInBody) {
      this.close();
    }
    this.clickInBody = false;
    event.stopPropagation();
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.closed.emit();
    this.restoreFocus();
    this.afterClose.emit();
  }

  onCancel() {
    if (this.disableCancel || this.loading) return;
    this.cancel.emit();
    this.close();
  }

  onOk() {
    if (this.disableOk || this.loading) return;
    this.ok.emit();
    this.close();
  }

  openModal() {
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    setTimeout(() => {
      if (this.focusSelector) {
        const el: HTMLElement | null = this.modalDialog?.nativeElement.querySelector(this.focusSelector);
        if (el) el.focus();
        else this.focusDialog();
      } else {
        this.focusDialog();
      }
    }, 20);
    this.afterOpen.emit();
  }

  focusDialog() {
    if (this.modalDialog) {
      this.modalDialog.nativeElement.focus();
    }
  }

  restoreFocus() {
    if (this.previouslyFocusedElement) {
      setTimeout(() => this.previouslyFocusedElement?.focus(), 30);
      this.previouslyFocusedElement = null;
    }
  }

  maintainFocus(event: KeyboardEvent) {
    if (!this.modalDialog) return;
    const focusableEls = this.modalDialog.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableEls.length) return;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    if (event.shiftKey) {
      if (document.activeElement === firstEl) {
        (lastEl as HTMLElement).focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastEl) {
        (firstEl as HTMLElement).focus();
        event.preventDefault();
      }
    }
  }
}