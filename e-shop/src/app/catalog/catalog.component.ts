import {Component, inject} from '@angular/core';
import {Product, ProductService} from '../services/ProductService';
import {convertBrowserOptions} from '@angular-devkit/build-angular/src/builders/browser-esbuild';
import {CategoryComponent} from '../category/category.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CategoryComponent,
    RouterLink
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  productService = inject(ProductService)
  products = this.productService.products;

  constructor() {
    // this.productService.getProducts()
    //   .subscribe(products => {
    //     for (let product of products) {
    //       this.products.push(product);
    //     }
    //   });
  }

}
