import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpService } from 'src/app/core/services/http.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  
  constructor(
    public cartService: CartService,
    private _httpService: HttpService,
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartItems.forEach((product) => {
       this.downloadPhoto(product);
    })
  }

  removeCartItem(oid: any): void {
    this.cartService.removeCartItem(oid);
    this.cartItems = this.cartItems.filter((item) => item.oid !== oid);
  }

  incrementCart(cart: any): void {
    this.cartService.updateCart(cart);
  }

  decrementCart(cart: any): void {
    if (this.cartService.getIndividualCartCount(cart.oid) === 1) {
      this.removeCartItem(cart.oid);
    } else this.cartService.decrementCartQty(cart);
  }

  downloadPhoto(product: any): void {
    this._httpService.getFile(product.image_path, 'photo')
    .subscribe({
      next: (res: any) => {
        if (res.body.type === 'image/*') {
          const unsafeUrl = URL.createObjectURL(res.body);
          product.image_url = this._sanitizer.bypassSecurityTrustUrl(unsafeUrl);
        }
      }
    });
  }
}
