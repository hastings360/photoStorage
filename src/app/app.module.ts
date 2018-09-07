import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DbTalkerService } from './db-talker.service';
import { CacheRequestService } from './cache-request.service';
import { HttpInterceptorService } from './http-interceptor.service';

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
    HttpClientModule
  ],
  providers: [PhotoStr, DbTalkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
