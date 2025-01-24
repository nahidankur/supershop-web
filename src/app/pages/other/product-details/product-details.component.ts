import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { APIEndpoint } from 'src/app/core/constants/api-endpoint';
import { HttpService } from 'src/app/core/services/http.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService,
    private _destroyRef: DestroyRef,
     public cartService: CartService
  ) { }
  oid!: any;
  isLoading: boolean = true;
  productDetails!: any;

  ngOnInit(): void {
    this.oid = this._activatedRoute.snapshot.paramMap.get('oid');
    this.getItemDetails(this.oid);
  }

  getItemDetails(oid: any): void {
    this.isLoading = true;
    this._httpService
        .get(APIEndpoint.GET_PRODUCT_DETAILS, false, { oid })
        .pipe(
            takeUntilDestroyed(this._destroyRef),
            finalize(() => (this.isLoading = false))
        )
        .subscribe({
            next: (res: any) => {
                if (res?.body.code == 200) {
                    this.productDetails = res.body.data;
                } else {
                    // this._router.navigate(['/page-not-found'], { skipLocationChange: true });
                }
            }
        });
}

addToCart(product: any): void {
  this.cartService.updateCart(product);
}

}
