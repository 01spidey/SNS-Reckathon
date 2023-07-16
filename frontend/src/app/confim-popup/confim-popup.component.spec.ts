import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfimPopupComponent } from './confim-popup.component';

describe('ConfimPopupComponent', () => {
  let component: ConfimPopupComponent;
  let fixture: ComponentFixture<ConfimPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfimPopupComponent]
    });
    fixture = TestBed.createComponent(ConfimPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
