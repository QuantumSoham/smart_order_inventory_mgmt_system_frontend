// src/app/core/models/user.model.ts
export interface User {
  userId: number;
  email: string;
  role: 'ADMIN' | 'FINANCE' | 'SALES_EXEC' | 'USER' | 'WAREHOUSE_MANAGER';
}
