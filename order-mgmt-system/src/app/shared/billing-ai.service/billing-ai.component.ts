import { Component , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillingAIService } from '../../core/services/billing-aiservice';

@Component({
  selector: 'app-billing-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing-ai.component.html',
  styleUrls: ['./billing-ai.component.css']
})
export class BillingChatbotComponent {

  question = '';
  answer = '';
  loading = false;

  constructor(private ai: BillingAIService,
    private cdr: ChangeDetectorRef
  ) {}

  askAI() {
    if (!this.question.trim()) return;

    this.loading = true;
    this.answer = '';

    this.ai.ask(this.question).subscribe({
      next: res => {
        this.answer = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.answer = '⚠️ AI service unavailable';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
