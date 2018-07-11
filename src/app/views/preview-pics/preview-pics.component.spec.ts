import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPicsComponent } from './preview-pics.component';

describe('PreviewPicsComponent', () => {
  let component: PreviewPicsComponent;
  let fixture: ComponentFixture<PreviewPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPicsComponent ]
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
