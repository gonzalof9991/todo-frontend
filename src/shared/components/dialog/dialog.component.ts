import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {ICategory, ITask} from '../task/task.interface';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service";
import * as moment from "moment";

export interface IDialogData {
  title: string;
  task: ITask;
  goingToCreate ?: boolean;
  options?: {
    buttons: {
      cancel: string;
      save: string;
    }
  }
}
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DialogComponent {
  public title: string = 'Edit Task';
  public completed: string = 'false';
  public form: FormGroup;
  public categories: ICategory[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public dataService: DataService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {
    this.title = this.data.title;
    this.completed = (this.data.task.completed) ? 'true' : 'false';
    this.form = this.formBuilder.group({
      title: [this.data.task.title, Validators.required],
      description: [this.data.task.description],
      priority: [this.data.task.priority, Validators.required],
      categories: [this.data.task.categories, Validators.required],
      estimatedTime: [this.data.task.estimated_time, Validators.required],
      completedTime: [this.data.task.completed_time,],
      type: [this.data.task.type, Validators.required],
      completed: [this.data.task.completed, Validators.required],
      createdDate: [this.data.task.created_at, Validators.required],
    });

    this.form.get('completed')?.setValue(this.completed);
    this.defaultDate();
    this.loadCategories();
  }

  public defaultDate(): void {
    if (this.data.goingToCreate){
      this.form.get('createdDate')?.setValue(moment());
    }
  }


  public loadCategories(): void {
    try{
      this.categories = this.dataService.getCategories;
      const categories: ICategory[] = [];
      this.categories.forEach((category: ICategory) => {
        if (this.data.task.categories?.find((cat: ICategory) => cat.id === category.id)) {
          categories.push(category);
        }
      });
      this.form.get('categories')?.setValue(categories);
    }catch (e) {
      this.form.get('categories')?.setValue([]);
    }

  }



  public close(type: 'cancel' | 'save' | 'delete'): void {
    if (type === 'cancel') {
      this.dialogRef.close({event: type});
      return;
    }

    if (type === 'delete') {
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
      categories: this.form.get('categories')?.value,
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
