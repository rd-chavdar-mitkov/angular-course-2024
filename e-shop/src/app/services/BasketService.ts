import {Injectable} from '@angular/core';
import {Product} from './ProductService';
import {LocalStorageService} from './LocalStorageService';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basket: Product[] = [];

  constructor(localStorageService: LocalStorageService) {
    const basket = localStorageService.getData('basket');
    if (basket) {
      this.basket = JSON.parse(basket);
    }
  }

  onDestroy(localStorageService: LocalStorageService) {
    localStorageService.saveData('basket', JSON.stringify(this.basket));
  }

  getBasket() {
    return this.basket;
  }

  addToBasket(product: Product) {
    this.basket.push(product);
  }

  removeFromBasket(product: Product) {
    const index = this.basket.indexOf(product);
    if (index > -1) {
      this.basket.splice(index, 1);
    }
  }

  clearBasket() {
    this.basket = [];
  }
}
