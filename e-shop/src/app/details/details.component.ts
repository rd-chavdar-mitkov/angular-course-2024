import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, ProductService} from '../services/ProductService';
import {FavService} from '../services/FavService';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  productService = inject(ProductService);
  favService = inject(FavService);
  showButton = true;
  protected product: Product | undefined;

  constructor(private activeRoute: ActivatedRoute) {
    let currentId = this.activeRoute.snapshot.paramMap.get('detailsId')
    console.log('DetailsComponent initialized: ' + currentId);
    this.productService
      .getProductById(currentId == null ? 0 : Number(currentId))
      .subscribe((product: Product | undefined) => {
        this.product = product;
      });

    this.showButton = !this.favService.contains(Number(currentId));
  }

  addToFav(product: Product | undefined) {
    if (product) {
      this.favService.addToFav(product);
      this.showButton = false;
      console.log('Product added to fav: ' + product.id);
    }
  }

}
