import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiservfinPage } from './miservfin.page';

describe('MiservfinPage', () => {
  let component: MiservfinPage;
  let fixture: ComponentFixture<MiservfinPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MiservfinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
