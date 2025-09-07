import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../cartservice';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  items: CartItem[] = [];
  total = 0;

  email = '';
  checkoutMessage = '';

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  checkout(): void {
    if (!this.email.trim()) {
      this.checkoutMessage = 'Please enter your email.';
      return;
    }

    if (this.items.length === 0) {
      this.checkoutMessage = 'Your cart is empty.';
      return;
    }

    this.http.post<any>('https://speedcubiclebackend.vercel.app/api/create-checkout-session', {
      email: this.email,
      items: this.items.map(i => ({ id: i.product.id, quantity: i.quantity }))
    }).subscribe({
      next: (res) => {
        if (res.url) {
          window.location.href = res.url;
        } else {
          this.checkoutMessage = res.error || 'Order failed.';
        }
      },
      error: (err) => {
        this.checkoutMessage = err.error?.error || 'Order failed.';
      }
    });
  }

  remove(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clear(): void {
    this.cartService.clearCart();
    this.loadCart();
  }
}
