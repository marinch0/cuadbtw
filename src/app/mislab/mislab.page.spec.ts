import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MislabPage } from './mislab.page';

describe('MislabPage', () => {
  let component: MislabPage;
  let fixture: ComponentFixture<MislabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MislabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
