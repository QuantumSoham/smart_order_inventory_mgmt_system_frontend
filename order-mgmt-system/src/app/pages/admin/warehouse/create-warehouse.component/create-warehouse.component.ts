import { Component } from '@angular/core';
import { WarehouseService } from '../../../../core/services/warehouse.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-warehouse-create',
  imports:[CommonModule, FormsModule],
  templateUrl: './create-warehouse.component.html'
})
export class CreateWarehouseComponent {

  warehouse = {
    name: '',
    location: ''
  };

  constructor(
    private warehouseService: WarehouseService,
    private router: Router
  ) {}

  create() {
    this.warehouseService.create(this.warehouse)
      .subscribe(() => this.router.navigate(['/warehouses']));
  }
}

