import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>) { }

  cancel() {
    this.dialogRef.close("cancel");
  }

  ok() {
    this.dialogRef.close("ok");
  }
}
