import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {ConfirmDialogData} from '../components/base-components/dialog-confirm/dialog-confirm.component';
import {DialogConfirmComponent} from '../components/base-components/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data,
      autoFocus: false
    });

    return dialogRef.afterClosed();
  }
}
