import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarMarcasComponent } from './gerenciar-marcas.component';

describe('GerenciarMarcasComponent', () => {
  let component: GerenciarMarcasComponent;
  let fixture: ComponentFixture<GerenciarMarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarMarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
