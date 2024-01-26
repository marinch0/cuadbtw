import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActinstalacionPage } from './actinstalacion.page';

describe('ActinstalacionPage', () => {
  let component: ActinstalacionPage;
  let fixture: ComponentFixture<ActinstalacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ActinstalacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
