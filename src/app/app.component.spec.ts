import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SharedModule} from "../shared/shared.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {AppModule} from "./app.module";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpClientTestingModule,
        AppModule,
        SharedModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });



  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it(`should have as title 'frontend'`, () => {
    expect(component.title).toEqual('frontend');
  });
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

});
