import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../../../../core/services/warehouse.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  imports: [RouterLink, CommonModule, FormsModule],
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  warehouses: any[] = [];

  /* MODAL STATE */
  showCreateModal = false;
  error = '';

  newWarehouse = {
    name: '',
    location: ''
  };

  constructor(
    private warehouseService: WarehouseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.warehouseService.getAll()
      .subscribe(res => this.warehouses = res);
  }

  openWarehouse(id: number) {
    this.router.navigate(['/warehouses', id]);
  }

  /* ---------- MODAL METHODS ---------- */

  openCreateModal() {
    this.showCreateModal = true;
    this.error = '';
    this.newWarehouse = { name: '', location: '' };
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createWarehouse() {
    this.error = '';

    this.warehouseService.create(this.newWarehouse)
      .subscribe({
        next: () => {
          this.closeCreateModal();
          this.load();
        },
        error: err => {
          this.error = err.error?.error || 'Failed to create warehouse';
        }
      });
  }
}
