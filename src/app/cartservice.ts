import { Injectable } from '@angular/core';
import { Product } from './productservice';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cart';
  private items: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  private saveCart(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  private loadCart(): void {
    const saved = localStorage.getItem(this.storageKey);
    this.items = saved ? JSON.parse(saved) : [];
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(product: Product): void {
    const item = this.items.find(i => i.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.saveCart();
  }

  clearCart(): void {
    this.items = [];
    localStorage.removeItem(this.storageKey);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
}
