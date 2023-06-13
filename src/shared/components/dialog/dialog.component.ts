import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ITask } from '../task/task.interface';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {of} from "rxjs";
export interface IDialogData{
  title: string;
  task: ITask;
  options?: {
    buttons: {
      cancel: string;
      save: string;
    }
  }
}
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
  public form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {
    this.title = this.data.title;
    this.completed = (this.data.task.completed) ? 'true' : 'false';
    this.form = new FormBuilder().group({
      title: [this.data.task.title, Validators.required],
      description: [this.data.task.description, Validators.required],
      priority: [this.data.task.priority, Validators.required],
      estimatedTime: [this.data.task.estimated_time, Validators.required],
      completedTime: [this.data.task.completed_time,],
      type: [this.data.task.type, Validators.required],
      completed: [this.data.task.completed, Validators.required],
      createdDate: [this.data.task.created_at, Validators.required],
    });
    this.form.get('completed')?.setValue(this.completed);
  }

  public close(type: 'cancel' | 'save'): void {
    if (type === 'cancel') {
      this.dialogRef.close({event: type});
      return;
    }
    this.validate();
    if (!this.validate()) {
      return;
    }
    this.data.task = this.buildTask();
    this.dialogRef.close({event: type, data: this.data.task});
  }

  public validate(): boolean {
    this.form.markAllAsTouched();
    return this.form.valid;
  }


  public buildTask(): ITask {
     const task: ITask = {
      id: this.data.task.id,
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      priority: this.form.get('priority')?.value,
      estimated_time: this.form.get('estimatedTime')?.value,
      completed_time: this.form.get('completedTime')?.value,
      type: this.form.get('type')?.value,
      completed: (this.form.get('completed')?.value === 'true') ? true : false,
      created_at: this.form.get('createdDate')?.value,
    }
    return task;
  }


}
