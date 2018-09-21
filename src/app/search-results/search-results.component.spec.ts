import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DbTalkerService } from '../db-talker.service';

import { SearchResultsComponent } from './search-results.component';
import { PreviewPicsComponent } from '../views/preview-pics/preview-pics.component';
import { MiniPicsComponent } from '../views/mini-pics/mini-pics.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ SearchResultsComponent, PreviewPicsComponent, MiniPicsComponent],
      providers: [DbTalkerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
