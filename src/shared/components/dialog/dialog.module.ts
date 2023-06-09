import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogComponent} from "./dialog.component";
import { SharedModule } from 'src/shared/shared.module';
import {  MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    SharedModule,
    MatDialogModule
  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
