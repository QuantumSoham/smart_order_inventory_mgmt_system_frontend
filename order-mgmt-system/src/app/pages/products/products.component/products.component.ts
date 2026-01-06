import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  newProduct: Product = {
    name: '',
    description: '',
    category: '',
    imageUrl: '',
    price: 0
  };

  loading = false;
  error = '';
  success = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: res => {
        this.products = res;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  addProduct() {
    this.error = '';
    this.success = '';

    this.productService.create(this.newProduct).subscribe({
      next: res => {
        this.success = 'Product added successfully';
        this.products.push(res);
        this.resetForm();
      },
      error: err => {
        this.error = 'Failed to add product';
      }
    });
  }

  deleteProduct(id?: number) {
    if (!id) return;

    this.productService.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
      },
      error: () => {
        this.error = 'Delete failed';
      }
    });
  }

  resetForm() {
    this.newProduct = {
      name: '',
      description: '',
      category: '',
      imageUrl: '',
      price: 0
    };
  }
}
