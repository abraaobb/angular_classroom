import {inject, Injectable, Type} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {
  ConfirmDialogData,
  DialogConfirmComponent
} from '../components/base-components/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private matDialog = inject(MatDialog);

  openDialog<T, D = any, R = any>(
    component: Type<T>,
    config?: MatDialogConfig<D>
  ): MatDialogRef<T, R> {
    return this.matDialog.open(component, config);
  }

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    const dialogRef = this.matDialog.open(DialogConfirmComponent, {
      width: '400px',
      data,
      autoFocus: false
    });

    return dialogRef.afterClosed();
  }
}
