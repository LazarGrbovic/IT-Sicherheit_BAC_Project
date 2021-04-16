import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTestComponent } from './chart-test.component';

describe('ChartTestComponent', () => {
  let component: ChartTestComponent;
  let fixture: ComponentFixture<ChartTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
