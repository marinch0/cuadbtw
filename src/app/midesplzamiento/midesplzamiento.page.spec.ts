import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MidesplzamientoPage } from './midesplzamiento.page';

describe('MidesplzamientoPage', () => {
  let component: MidesplzamientoPage;
  let fixture: ComponentFixture<MidesplzamientoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MidesplzamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
