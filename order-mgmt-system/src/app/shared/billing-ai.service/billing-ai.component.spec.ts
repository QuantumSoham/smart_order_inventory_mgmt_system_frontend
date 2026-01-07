import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingAiService } from './billing-ai.component';

describe('BillingAiService', () => {
  let component: BillingAiService;
  let fixture: ComponentFixture<BillingAiService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingAiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingAiService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
