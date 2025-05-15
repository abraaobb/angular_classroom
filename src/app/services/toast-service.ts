import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export interface ToastInfo {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  delay: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts$ = new Subject<ToastInfo>();

  show(message: string, type: ToastInfo['type'] = 'success', delay: number = 5000) {
    this.toasts$.next({message, type, delay});
  }

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  showError(message: string) {
    this.show(message, 'error');
  }

  showWarning(message: string) {
    this.show(message, 'warning');
  }

  showInfo(message: string) {
    this.show(message, 'info');
  }
}
