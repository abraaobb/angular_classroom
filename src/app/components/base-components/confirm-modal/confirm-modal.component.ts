import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  @Input() message = 'Tem certeza que deseja excluir?';

  constructor(public modal: any) {
  }

}
