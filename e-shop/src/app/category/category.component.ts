import {Component, inject} from '@angular/core';
import {ProductService} from '../services/ProductService';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  productService = inject(ProductService)

  categories: string[] = []

  constructor() {
    this.productService.getCategories().subscribe(data => {
      for (let category of data) {
        this.categories.push(category);
      }
      console.log(this.categories)
    });
  }

  handleCategoryChange(tag: string) {
    this.productService.changeCategory(tag);
    console.log("Category changed to: " + tag);
  }
}
