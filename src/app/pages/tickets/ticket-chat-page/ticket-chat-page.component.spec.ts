import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketChatPageComponent } from './ticket-chat-page.component';

describe('TicketChatPageComponent', () => {
  let component: TicketChatPageComponent;
  let fixture: ComponentFixture<TicketChatPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketChatPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketChatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
