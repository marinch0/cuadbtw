import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumosPage } from './consumos.page';

describe('ConsumosPage', () => {
  let component: ConsumosPage;
  let fixture: ComponentFixture<ConsumosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConsumosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
