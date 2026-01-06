import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserOrdersService {
  private baseUrl='http://localhost:8051/orders';

  constructor(private http:HttpClient)
  {
  }
  getOrdersByUser(userId: number) : Observable<any[]>
  {
     return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }

  cancelOrder(orderId: number): Observable<any> {
  return this.http.put(
    `${this.baseUrl}/${orderId}/cancel`,
    {}
  );
}

  
}
