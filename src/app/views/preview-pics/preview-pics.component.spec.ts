import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewPicsComponent } from './preview-pics.component';
import { DbTalkerService } from '../../db-talker.service';
import { HttpClientModule } from '@angular/common/http';

describe('PreviewPicsComponent', () => {
  let component: PreviewPicsComponent;
  let fixture: ComponentFixture<PreviewPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PreviewPicsComponent],
      providers: [DbTalkerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
