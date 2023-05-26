import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SharedModule} from "../shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TaskComponent} from "../shared/components/task/task.component";
import {ContentComponent} from "../shared/components/content/content.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    TaskComponent,
    ContentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
