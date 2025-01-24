import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'supershop-web';

  constructor(
    public cartService: CartService
  ) {}

  ngOnInit(): void {
  }
}
