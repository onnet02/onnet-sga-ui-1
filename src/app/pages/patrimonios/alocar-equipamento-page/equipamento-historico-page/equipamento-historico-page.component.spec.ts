import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoHistoricoPageComponent } from './equipamento-historico-page.component';

describe('EquipamentoHistoricoPageComponent', () => {
  let component: EquipamentoHistoricoPageComponent;
  let fixture: ComponentFixture<EquipamentoHistoricoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentoHistoricoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoHistoricoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
