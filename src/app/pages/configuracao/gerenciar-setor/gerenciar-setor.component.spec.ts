import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarSetorComponent } from './gerenciar-setor.component';

describe('GerenciarSetorComponent', () => {
  let component: GerenciarSetorComponent;
  let fixture: ComponentFixture<GerenciarSetorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarSetorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarSetorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
