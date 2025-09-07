import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ProductComponent } from './product/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ProductComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'SpeedCubicle';
}
