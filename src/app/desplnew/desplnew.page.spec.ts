import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesplnewPage } from './desplnew.page';

describe('DesplnewPage', () => {
  let component: DesplnewPage;
  let fixture: ComponentFixture<DesplnewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DesplnewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
