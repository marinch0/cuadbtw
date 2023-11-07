import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasespecialPage } from './casespecial.page';

describe('CasespecialPage', () => {
  let component: CasespecialPage;
  let fixture: ComponentFixture<CasespecialPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CasespecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
