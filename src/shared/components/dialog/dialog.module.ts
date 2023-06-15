import { NgModule } from '@angular/core';
import {DialogComponent} from "./dialog.component";
import { SharedModule } from 'src/shared/shared.module';
import {  MatDialogModule } from '@angular/material/dialog';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DialogComponent
  ],
    imports: [
        SharedModule,
        MatDialogModule,
        ReactiveFormsModule,
    ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
