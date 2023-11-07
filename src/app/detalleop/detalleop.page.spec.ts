import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleopPage } from './detalleop.page';

describe('DetalleopPage', () => {
  let component: DetalleopPage;
  let fixture: ComponentFixture<DetalleopPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
