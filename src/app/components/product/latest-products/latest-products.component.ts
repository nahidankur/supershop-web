import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { APIEndpoint } from 'src/app/core/constants/api-endpoint';
import { HttpService } from 'src/app/core/services/http.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.css']
})
export class LatestProductsComponent implements OnInit {
  isLoading: boolean = true;
  latestProducts: any[] = [];
  
  constructor(
            private _httpService: HttpService,
            private _destroyRef: DestroyRef,
            private _sanitizer: DomSanitizer,
            public cartService: CartService
  ) { }

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

      loadFeaturedProducts(): void {
        this.isLoading = true;
        this._httpService
        .get(APIEndpoint.GET_PRODUCT_LIST, false, { product_type: 'latest' } )
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (res: any) => {
            if (res.body.code === 200) {
              this.latestProducts = res.body.data.rows;
              this.latestProducts.forEach((product) => {
                this.downloadPhoto(product);
              })
              this.isLoading = false;
            }
          },
          error: (err: any) => {
            console.log('error', err);
            this.isLoading = false;
          }
        })
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

      addToCart(product: any): void {
        this.cartService.updateCart(product);
      }

}
