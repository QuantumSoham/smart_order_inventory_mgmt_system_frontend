import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingReportsService } from '../../services/billing-reports';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardPage implements AfterViewInit {

  constructor(private reports: BillingReportsService) {}

  ngAfterViewInit() {
    this.loadRevenueChart();
    this.loadCategoryChart();
    this.loadWarehouseChart();
    this.loadTopProductsChart();
  }

  loadRevenueChart() {
    this.reports.revenue('2026-01-01', '2026-12-31')
      .subscribe(data => {
        new Chart('revenueChart', {
          type: 'line',
          data: {
            labels: data.map(d => d.date),
            datasets: [{
              label: 'Revenue',
              data: data.map(d => d.revenue),
              borderWidth: 2
            }]
          }
        });
      });
  }

  loadCategoryChart() {
    this.reports.salesByCategory().subscribe(data => {
      new Chart('categoryChart', {
        type: 'pie',
        data: {
          labels: data.map(d => d.category),
          datasets: [{
            data: data.map(d => d.revenue)
          }]
        }
      });
    });
  }

  loadWarehouseChart() {
    this.reports.salesByWarehouse().subscribe(data => {
      new Chart('warehouseChart', {
        type: 'bar',
        data: {
          labels: data.map(d => `Warehouse ${d.warehouseId}`),
          datasets: [{
            label: 'Revenue',
            data: data.map(d => d.revenue)
          }]
        }
      });
    });
  }

  loadTopProductsChart() {
    this.reports.topProducts().subscribe(data => {
      new Chart('productsChart', {
        type: 'bar',
        data: {
          labels: data.map(d => d.productName),
          datasets: [{
            label: 'Revenue',
            data: data.map(d => d.revenue)
          }]
        }
      });
    });
  }
}
