import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {
  constructor(public dialogRef: MatDialogRef<DialogConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) {
  }
}
