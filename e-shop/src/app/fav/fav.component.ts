import {Component, inject} from '@angular/core';
import {FavService} from '../services/FavService';
import {Product} from '../services/ProductService';

@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css'
})
export class FavComponent {

  favService = inject(FavService);
  products: Product[] = []

  constructor() {
    this.products = this.favService.getFav()
  }

  removeFromFav(product: Product) {
    this.favService.removeFromFav(product)
  }
}
