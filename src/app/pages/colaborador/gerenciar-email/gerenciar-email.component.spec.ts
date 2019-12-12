import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarEmailComponent } from './gerenciar-email.component';

describe('GerenciarEmailComponent', () => {
  let component: GerenciarEmailComponent;
  let fixture: ComponentFixture<GerenciarEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
