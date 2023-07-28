import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxSpinnerModule } from 'ngx-spinner'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { AdminModule } from './admin/admin.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    AdminModule,
    ShowcaseModule,
    NgxSpinnerModule,HttpClientModule
  ],
  providers: [{
    provide:'baseUrl',useValue:'https://localhost:7131/api',multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
