import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMenuPageComponent } from './ticket-menu-page.component';

describe('TicketMenuPageComponent', () => {
  let component: TicketMenuPageComponent;
  let fixture: ComponentFixture<TicketMenuPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketMenuPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
