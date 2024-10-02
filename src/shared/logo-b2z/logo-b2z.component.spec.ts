import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoB2zComponent } from './logo-b2z.component';

describe('LogoB2zComponent', () => {
  let component: LogoB2zComponent;
  let fixture: ComponentFixture<LogoB2zComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoB2zComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoB2zComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
