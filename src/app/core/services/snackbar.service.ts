import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnackbarData } from '../modals/snackbar-modal';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private snackbars$ = new BehaviorSubject<SnackbarData[]>([]);

  get snackbars() {
    return this.snackbars$.asObservable();
  }

  show(data: SnackbarData): string {
    const id = data.id || Math.random().toString(36).slice(2);
    const snackbar = { ...data, id };
    this.snackbars$.next([...this.snackbars$.value, snackbar]);
    return id;
  }

  dismiss(id: string) {
    this.snackbars$.next(this.snackbars$.value.filter(s => s.id !== id));
  }

  dismissAll() {
    this.snackbars$.next([]);
  }

  update(id: string, data: Partial<SnackbarData>) {
    const list = this.snackbars$.value.map(s =>
      s.id === id ? { ...s, ...data } : s
    );
    this.snackbars$.next(list);
  }
}