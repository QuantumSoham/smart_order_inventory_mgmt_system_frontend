import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BillingAIService {

  private aiUrl = 'http://localhost:8051/ai/billing';

  constructor(private http: HttpClient) {}

  ask(question: string)
  {
    return this.http.post(this.aiUrl, { question }, {responseType:'text'});
  }
}
