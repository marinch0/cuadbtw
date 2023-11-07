import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MicasoespPage } from './micasoesp.page';

describe('MicasoespPage', () => {
  let component: MicasoespPage;
  let fixture: ComponentFixture<MicasoespPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MicasoespPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
