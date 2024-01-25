import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservPage } from './observ.page';

describe('ObservPage', () => {
  let component: ObservPage;
  let fixture: ComponentFixture<ObservPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ObservPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
