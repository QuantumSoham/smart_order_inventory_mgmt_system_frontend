import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  private baseUrl = 'http://localhost:8051';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/warehouses`);
  }

  create(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/warehouses`, payload);
  }
}
