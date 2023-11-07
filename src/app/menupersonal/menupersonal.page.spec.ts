import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenupersonalPage } from './menupersonal.page';

describe('MenupersonalPage', () => {
  let component: MenupersonalPage;
  let fixture: ComponentFixture<MenupersonalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenupersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
