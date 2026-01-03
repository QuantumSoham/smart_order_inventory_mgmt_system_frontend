import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private baseUrl = 'http://localhost:8051/orders';

  constructor(private http: HttpClient) {}

  placeOrder(payload: any) 
  {
    return this.http.post(this.baseUrl, payload);
  }
 // hardcoded order payload for testing api gateway
  // createOrder() {
  //   const payload = {
  //     userId: 2,
  //     warehouseId: 1,
  //     shippingName: 'Soham',
  //     shippingPhone: '9999999999',
  //     shippingAddress: '12 MG Road',
  //     city: 'Bangalore',
  //     state: 'KA',
  //     pincode: '560001',
  //     items: [
  //       { productId: 1, quantity: 2 },
  //       { productId: 2, quantity: 1 }
  //     ]
  //   };

  //   return this.http.post(this.baseUrl, payload);
  // }
}


