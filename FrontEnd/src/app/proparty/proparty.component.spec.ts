import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropartyComponent } from './proparty.component';

describe('PropartyComponent', () => {
  let component: PropartyComponent;
  let fixture: ComponentFixture<PropartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropartyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
