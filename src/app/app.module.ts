import { DbTalkerService } from './db-talker.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MiniPicsComponent } from './views/mini-pics/mini-pics.component';
import { PhotoStr } from './photo-str.model';
import { PreviewPicsComponent } from './views/preview-pics/preview-pics.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    SearchComponent,
    SearchResultsComponent,
    MiniPicsComponent,
    PreviewPicsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule
  ],
  providers: [DbTalkerService,PhotoStr],
  bootstrap: [AppComponent]
})
export class AppModule { }
