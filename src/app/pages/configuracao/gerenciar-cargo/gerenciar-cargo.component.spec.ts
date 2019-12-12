import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarCargoComponent } from './gerenciar-cargo.component';

describe('GerenciarCargoComponent', () => {
  let component: GerenciarCargoComponent;
  let fixture: ComponentFixture<GerenciarCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
