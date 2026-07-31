import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  joined: string;
  revenue: number;
}

@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css',
})
export class CustomerDashboard {
  searchQuery = signal('');
  statusFilter = signal<'All' | 'Active' | 'Inactive'>('All');

  customers = signal<Customer[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '(555) 123-4567', status: 'Active', joined: '2024-01-15', revenue: 12500 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '(555) 234-5678', status: 'Active', joined: '2024-02-20', revenue: 8300 },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', phone: '(555) 345-6789', status: 'Inactive', joined: '2023-11-10', revenue: 4200 },
    { id: 4, name: 'David Brown', email: 'david@example.com', phone: '(555) 456-7890', status: 'Active', joined: '2024-03-05', revenue: 15600 },
    { id: 5, name: 'Eva Davis', email: 'eva@example.com', phone: '(555) 567-8901', status: 'Active', joined: '2024-04-12', revenue: 9800 },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', phone: '(555) 678-9012', status: 'Inactive', joined: '2023-09-22', revenue: 3100 },
    { id: 7, name: 'Grace Wilson', email: 'grace@example.com', phone: '(555) 789-0123', status: 'Active', joined: '2024-05-18', revenue: 11200 },
    { id: 8, name: 'Henry Moore', email: 'henry@example.com', phone: '(555) 890-1234', status: 'Active', joined: '2024-06-01', revenue: 7400 },
  ]);

  filteredCustomers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const status = this.statusFilter();

    return this.customers().filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query);
      const matchesStatus = status === 'All' || c.status === status;
      return matchesSearch && matchesStatus;
    });
  });

  totalCustomers = computed(() => this.customers().length);
  activeCustomers = computed(() => this.customers().filter((c) => c.status === 'Active').length);
  totalRevenue = computed(() => this.customers().reduce((sum, c) => sum + c.revenue, 0));

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  onFilterChange(status: 'All' | 'Active' | 'Inactive') {
    this.statusFilter.set(status);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }
}
