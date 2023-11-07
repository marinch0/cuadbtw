import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaboresPage } from './labores.page';

describe('LaboresPage', () => {
  let component: LaboresPage;
  let fixture: ComponentFixture<LaboresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LaboresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
