import {inject, Injectable} from '@angular/core';
import {Product} from './ProductService';
import {LocalStorageService} from './LocalStorageService';

@Injectable(
  {providedIn: 'root'}
)
export class FavService {

  fav: Product[] = [];

  localStorageService = inject(LocalStorageService);

  constructor(localStorageService: LocalStorageService) {
    const fav = localStorageService.getData('fav');
    if (fav) {
      this.fav = JSON.parse(fav);
    }
    debugger;
  }

  onDestroy(localStorageService: LocalStorageService) {
    console.log('FavService.onDestroy');
    localStorageService.saveData('fav', JSON.stringify(this.fav));

  }

  getFav(): Product[] {
    const currentFav = this.localStorageService.getData('fav');
    if (currentFav) {
      return JSON.parse(currentFav);
    } else {
      return [];
    }
  }

  addToFav(product: Product) {
    this.fav.push(product);
    console.log('Product added to favService: ' + product.id);
    this.localStorageService.saveData('fav', JSON.stringify(this.fav));
    console.log('FavService: ' + this.fav.join(','));
    debugger;
  }

  // @ts-ignore
  contains(productId: number): boolean {
    const currentFav = this.localStorageService.getData('fav');
    if (currentFav) {
      const products: Product[] = JSON.parse(currentFav)
      return products.find(x => x.id == productId) != undefined;
    }
  }

  removeFromFav(product: Product) {
    this.localStorageService.removeData('fav');
    // const currentFav = this.localStorageService.getData('fav');
    // if (currentFav) {
    //   this.fav = JSON.parse(currentFav);
    //   const index = this.fav.indexOf(product);
    //   if (index > -1) {
    //     this.fav.splice(index, 1);
    //     this.localStorageService.saveData('fav', JSON.stringify(this.fav));
    //   }
    // }
  }
}
