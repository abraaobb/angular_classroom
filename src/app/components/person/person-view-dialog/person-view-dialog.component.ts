import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Person} from '../../../models/person';
import {DatePipe} from '@angular/common';
import {MaterialModule} from '../../../modules/material.modules';

@Component({
  selector: 'app-person-view-dialog',
  imports: [
    DatePipe,
    MaterialModule
  ],
  templateUrl: './person-view-dialog.component.html',
  styleUrl: './person-view-dialog.component.scss'
})
export class PersonViewDialogComponent {
  data = inject<{ person: Person }>(MAT_DIALOG_DATA);

}
