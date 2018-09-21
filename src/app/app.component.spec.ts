import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DbTalkerService } from './db-talker.service';
import { HttpClientModule } from '@angular/common/http';
import { InputFormComponent } from './input-form/input-form.component';
import { LoginComponent } from './login/login.component';
import { MiniPicsComponent } from './views/mini-pics/mini-pics.component';
import { PreviewPicsComponent } from './views/preview-pics/preview-pics.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      declarations: [
        AppComponent, InputFormComponent, LoginComponent, LoginComponent, MiniPicsComponent,
        PreviewPicsComponent, SearchComponent, SearchResultsComponent
      ],
      providers: [DbTalkerService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('My Groovy Photos');
  }));
});
