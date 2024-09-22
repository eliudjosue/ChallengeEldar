import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunubarComponent } from './munubar.component';

describe('MunubarComponent', () => {
  let component: MunubarComponent;
  let fixture: ComponentFixture<MunubarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MunubarComponent]
    });
    fixture = TestBed.createComponent(MunubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
