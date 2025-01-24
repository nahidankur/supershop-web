import { Component, OnInit, DestroyRef } from '@angular/core';
import { APIEndpoint } from 'src/app/core/constants/api-endpoint';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpService } from 'src/app/core/services/http.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  isLoading: boolean = false;
  heroProducts: any[] = [];

  constructor(
    private _httpService: HttpService,
    private _destroyRef: DestroyRef,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadHeroProducts();
  }

  loadHeroProducts(): void {
    this.isLoading = true;
    this._httpService
    .get(APIEndpoint.GET_CAROUSEL_PRODUCT_LIST, false)
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      finalize(() => this.isLoading = false)
    )
    .subscribe({
      next: (res: any) => {
        if (res.body.code === 200) {
          this.heroProducts = res.body.data.rows;
          this.heroProducts.forEach((product) => {
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
          product.image_path = this._sanitizer.bypassSecurityTrustUrl(unsafeUrl);
        }
      }
    });
  }
}
