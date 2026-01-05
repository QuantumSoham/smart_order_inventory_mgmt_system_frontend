import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminAnalyticsService } from '../../../core/services/admin-analytics.service';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  // ---------- DATA ----------
  kpis: any = {};
  ordersByStatus: any[] = [];
  ordersByWarehouse: any[] = [];
  revenueByWarehouse: any[] = [];
  revenueByDate: any[] = [];
  ordersByState: any[] = [];

  fromDate!: string;
  toDate!: string;

  // ---------- CANVAS REFERENCES ----------
  @ViewChild('statusCanvas') statusCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('warehouseCanvas') warehouseCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueWarehouseCanvas') revenueWarehouseCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueDateCanvas') revenueDateCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('stateCanvas') stateCanvas!: ElementRef<HTMLCanvasElement>;

  // ---------- CHART INSTANCES ----------
  statusChart?: Chart;
  warehouseChart?: Chart;
  revenueWarehouseChart?: Chart;
  revenueDateChart?: Chart;
  stateChart?: Chart;

  constructor(private analytics: AdminAnalyticsService) {}

  // ---------- LIFECYCLE ----------
  ngOnInit() {
    this.setDefaultDates();
    this.loadAll();
  }

  ngAfterViewInit() {}

  // ---------- DATE HANDLING ----------
  setDefaultDates() {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - 7);

    this.toDate = today.toISOString().split('T')[0];
    this.fromDate = past.toISOString().split('T')[0];
  }

  // ---------- LOADERS ----------
  loadAll() {
    this.analytics.getKpis().subscribe(res => this.kpis = res);

    this.analytics.getOrdersByStatus().subscribe(res => {
      this.ordersByStatus = res;
      setTimeout(() => this.renderStatusChart());
    });

    this.analytics.getOrdersByWarehouse().subscribe(res => {
      this.ordersByWarehouse = res;
      setTimeout(() => this.renderWarehouseChart());
    });

    this.analytics.getRevenueByWarehouse().subscribe(res => {
      this.revenueByWarehouse = res;
      setTimeout(() => this.renderRevenueWarehouseChart());
    });

    this.analytics.getOrdersByState().subscribe(res => {
      this.ordersByState = res;
      setTimeout(() => this.renderStateChart());
    });

    this.loadRevenueByDate();
  }

  loadRevenueByDate() {
    this.analytics
      .getRevenueByDate(this.fromDate, this.toDate)
      .subscribe(res => {
        this.revenueByDate = res;
        setTimeout(() => this.renderRevenueDateChart());
      });
  }

  // ---------- CHART RENDERERS ----------

  renderStatusChart() {
    if (!this.statusCanvas) return;

    this.statusChart?.destroy();
    this.statusChart = new Chart(this.statusCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.ordersByStatus.map(o => o.status),
        datasets: [{
          data: this.ordersByStatus.map(o => o.count),
          backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0']
        }]
      }
    });
  }

  renderWarehouseChart() {
    if (!this.warehouseCanvas) return;

    this.warehouseChart?.destroy();
    this.warehouseChart = new Chart(this.warehouseCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.ordersByWarehouse.map(w => `WH-${w.warehouseId}`),
        datasets: [{
          label: 'Orders',
          data: this.ordersByWarehouse.map(w => w.count)
        }]
      },
      options: { responsive: true }
    });
  }

  renderRevenueWarehouseChart() {
    if (!this.revenueWarehouseCanvas) return;

    this.revenueWarehouseChart?.destroy();
    this.revenueWarehouseChart = new Chart(this.revenueWarehouseCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.revenueByWarehouse.map(r => `WH-${r.warehouseId}`),
        datasets: [{
          label: 'Revenue',
          data: this.revenueByWarehouse.map(r => r.revenue)
        }]
      }
    });
  }

  renderRevenueDateChart() {
    if (!this.revenueDateCanvas) return;

    this.revenueDateChart?.destroy();
    this.revenueDateChart = new Chart(this.revenueDateCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.revenueByDate.map(r => r.date),
        datasets: [{
          label: 'Revenue',
          data: this.revenueByDate.map(r => r.revenue),
          borderWidth: 2,
          tension: 0.3
        }]
      }
    });
  }

  renderStateChart() {
    if (!this.stateCanvas) return;

    this.stateChart?.destroy();
    this.stateChart = new Chart(this.stateCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.ordersByState.map(s => s.state),
        datasets: [{
          data: this.ordersByState.map(s => s.count),
          backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4caf50']
        }]
      }
    });
  }
}
