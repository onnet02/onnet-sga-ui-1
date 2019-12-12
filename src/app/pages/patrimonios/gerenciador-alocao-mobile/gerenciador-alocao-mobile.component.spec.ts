import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorAlocaoMobileComponent } from './gerenciador-alocao-mobile.component';

describe('GerenciadorAlocaoMobileComponent', () => {
  let component: GerenciadorAlocaoMobileComponent;
  let fixture: ComponentFixture<GerenciadorAlocaoMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciadorAlocaoMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciadorAlocaoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
