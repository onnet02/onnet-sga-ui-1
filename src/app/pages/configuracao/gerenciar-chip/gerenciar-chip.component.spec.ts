import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarChipComponent } from './gerenciar-chip.component';

describe('GerenciarChipComponent', () => {
  let component: GerenciarChipComponent;
  let fixture: ComponentFixture<GerenciarChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
