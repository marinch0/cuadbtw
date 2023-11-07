import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DespPage } from './desp.page';

describe('DespPage', () => {
  let component: DespPage;
  let fixture: ComponentFixture<DespPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DespPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
