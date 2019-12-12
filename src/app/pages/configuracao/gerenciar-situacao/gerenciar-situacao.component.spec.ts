import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarSituacaoComponent } from './gerenciar-situacao.component';

describe('GerenciarSituacaoComponent', () => {
  let component: GerenciarSituacaoComponent;
  let fixture: ComponentFixture<GerenciarSituacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarSituacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarSituacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
