import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  @Input() context = '';
  @Input() title = '';
  @Input() showReadCarefully = false;

  constructor(
    public dialogRef: NbDialogRef<ConfirmationDialogComponent>,
  ) { }


  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

}
