import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkappsComponent } from './linkapps.component';

describe('LinkappsComponent', () => {
  let component: LinkappsComponent;
  let fixture: ComponentFixture<LinkappsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkappsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
