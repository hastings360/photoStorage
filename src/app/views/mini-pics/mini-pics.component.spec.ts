import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPicsComponent } from './mini-pics.component';

describe('MiniPicsComponent', () => {
  let component: MiniPicsComponent;
  let fixture: ComponentFixture<MiniPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPicsComponent ]
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
