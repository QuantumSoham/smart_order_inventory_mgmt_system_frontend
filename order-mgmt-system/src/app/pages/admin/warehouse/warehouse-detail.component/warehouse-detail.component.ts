import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehouseService } from '../../../../core/services/warehouse.service';
import { InventoryService } from '../../../../core/services/inventory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
   standalone:true,
  selector: 'app-warehouse-detail',
  templateUrl: './warehouse-detail.component.html',
  imports:[CommonModule, FormsModule],
  styleUrls: ['./warehouse-detail.component.css']
})
export class WarehouseDetailComponent implements OnInit {

  warehouseId!: number;
  warehouse: any;

  inventory: any[] = [];
  lowStock: any[] = [];

  tab: 'inventory' | 'lowStock' = 'inventory';
  error = '';

  newInv = {
    productId: '',
    category: '',
    quantity: 0,
    lowStockThreshold: 10
  };
showUpdateModal = false;
selectedInventory: any;

updatePayload = {
  category: '',
  quantity: 0
};

  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.warehouseId = Number(this.route.snapshot.paramMap.get('id'));

    this.warehouseService.getAll()
      .subscribe(res =>
        this.warehouse = res.find(w => w.id === this.warehouseId)
      );

    this.loadInventory();
    this.loadLowStock();
  }

  loadInventory() {
    this.tab='inventory'
    this.inventoryService.getByWarehouse(this.warehouseId)
      .subscribe(res => this.inventory = res);
  }

  loadLowStock() {
    this.inventoryService.getLowStock()
      .subscribe(res =>
        this.lowStock = res.filter(l => l.warehouseId === this.warehouseId)
      );
  }

  addInventory() {
    this.error = '';

    this.inventoryService.createInventory({
      ...this.newInv,
      warehouseId: this.warehouseId
    }).subscribe({
      next: () => this.loadInventory(),
      error: err => this.error = err.error?.error
    });
  }
  openUpdateModal(inv: any) {
  this.selectedInventory = inv;
  this.updatePayload = {
    category: inv.category,
    quantity: inv.available
  };
  this.showUpdateModal = true;
}

closeUpdateModal() {
  this.showUpdateModal = false;
  this.selectedInventory = null;
}

submitUpdate() {
  this.inventoryService.updateInventory(
    this.selectedInventory.inventoryId,
    this.updatePayload
  ).subscribe({
    next: () => {
      this.closeUpdateModal();
      this.loadInventory();
    },
    error: err => this.error = err.error?.error || 'Update failed'
  });
}

}

