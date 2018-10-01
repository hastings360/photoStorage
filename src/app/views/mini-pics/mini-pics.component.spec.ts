import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MiniPicsComponent } from './mini-pics.component';
import { DbTalkerService } from '../../db-talker.service';
import { HttpClientModule } from '@angular/common/http';
import { PhotoStr } from '../../photo-str.model';


const fakePhoto: PhotoStr = {
    _id: 'test',
    imageName: 'test',
    description: 'test',
    contributor: 'test',
    location: 'test',
    category: 'test',
    date: 'test',
    image: 'test',
    timeStamp: new Date(Date.now())
};

describe('MiniPicsComponent', () => {
  let component: MiniPicsComponent;
  let fixture: ComponentFixture<MiniPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [MiniPicsComponent],
      providers: [DbTalkerService, PhotoStr]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPicsComponent);
    component = fixture.componentInstance;
    component.photo = fakePhoto;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
