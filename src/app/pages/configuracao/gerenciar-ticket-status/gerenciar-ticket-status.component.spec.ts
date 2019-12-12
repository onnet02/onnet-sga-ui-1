import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarTicketStatusComponent } from './gerenciar-ticket-status.component';

describe('GerenciarTicketStatusComponent', () => {
  let component: GerenciarTicketStatusComponent;
  let fixture: ComponentFixture<GerenciarTicketStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarTicketStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarTicketStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
