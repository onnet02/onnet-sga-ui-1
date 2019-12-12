import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoCelularComponent } from './historico-celular.component';

describe('HistoricoCelularComponent', () => {
  let component: HistoricoCelularComponent;
  let fixture: ComponentFixture<HistoricoCelularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoCelularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
