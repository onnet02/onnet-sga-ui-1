import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocarEquipamentoPageComponent } from './alocar-equipamento-page.component';

describe('AlocarEquipamentoPageComponent', () => {
  let component: AlocarEquipamentoPageComponent;
  let fixture: ComponentFixture<AlocarEquipamentoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlocarEquipamentoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocarEquipamentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
