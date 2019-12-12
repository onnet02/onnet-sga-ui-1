import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarMobileEmailComponent } from './gerenciar-mobile-email.component';

describe('GerenciarMobileEmailComponent', () => {
  let component: GerenciarMobileEmailComponent;
  let fixture: ComponentFixture<GerenciarMobileEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarMobileEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarMobileEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
