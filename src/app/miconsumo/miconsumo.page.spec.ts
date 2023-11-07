import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiconsumoPage } from './miconsumo.page';

describe('MiconsumoPage', () => {
  let component: MiconsumoPage;
  let fixture: ComponentFixture<MiconsumoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MiconsumoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
