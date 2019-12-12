import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarCelularComponent } from './gerenciar-celular.component';

describe('GerenciarCelularComponent', () => {
  let component: GerenciarCelularComponent;
  let fixture: ComponentFixture<GerenciarCelularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarCelularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
