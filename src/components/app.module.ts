import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { AppRoutesModule } from '../router/index';

import { environment } from '../environments/environment';
import { DialogService } from '../services/dialog.service';
import { DialogComponent } from './common/dialog/dialog.component';

@NgModule({
  imports: [
    HttpModule,
    FormsModule,
    AppRoutesModule,
    BrowserModule
  ],
  declarations: [
    DialogComponent,
    AppComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
