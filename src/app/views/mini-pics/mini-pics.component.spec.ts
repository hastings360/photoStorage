import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniPicsComponent } from './mini-pics.component';
import { DbTalkerService } from '../../db-talker.service';
import { HttpClientModule } from '@angular/common/http';

describe('MiniPicsComponent', () => {
  let component: MiniPicsComponent;
  let fixture: ComponentFixture<MiniPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [MiniPicsComponent],
      providers: [DbTalkerService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
