import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarEquipamentoComponent } from './gerenciar-equipamento.component';

describe('GerenciarEquipamentoComponent', () => {
  let component: GerenciarEquipamentoComponent;
  let fixture: ComponentFixture<GerenciarEquipamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarEquipamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
