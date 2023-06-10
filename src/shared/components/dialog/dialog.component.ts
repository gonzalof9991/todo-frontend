import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ITask } from '../task/task.interface';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';

export const MY_FORMATS = {
  display: {
    dateInput: 'dd-MM-yyyy',
    monthYearLabel: 'dd MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'dd MMMM YYYY',
  },
};
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DialogComponent {
  public title: string = 'Edit Task';
  public completed: string = 'false';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask
  ) {
    this.title = this.data.title;
    this.completed = (this.data.completed) ? 'true' : 'false';
    console.log(this.data);
  }

  public close(type: 'cancel' | 'save'): void {
    if (type === 'cancel') {
      this.dialogRef.close({event: type});
      return;
    }
    this.data.completed = (this.completed === 'true') ? true : false;
    this.dialogRef.close({event: type, data: this.data});
  }


}
