import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from './CommentService';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

type Result<T> = {
  data: T;
  error: any;
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'https://fakestoreapi.com/products';
  private tagsUrl = 'https://fakestoreapi.com/products/categories';
  http = inject(HttpClient);

  constructor() {}

  private tagsResult$: Observable<Result<string[]>> = this.http
    .get<string[]>(this.tagsUrl)
    .pipe(
      map((tags) => {
        return { data: tags, error: null };
      }),
      catchError((err) => {
        return of({ data: [], error: err });
      })
    );

  private tagsResult = toSignal(this.tagsResult$, {
    initialValue: { data: [], error: null },
  });

  tags = computed(() => {
    return this.tagsResult().data;
  });

  selectedTag = signal('');
  setSelectedTag(tag: string) {
    this.selectedTag.set(tag);
  }

  private productsResult$: Observable<Result<Product[]>> = toObservable(
    this.selectedTag
  ).pipe(
    switchMap((tag) => {
      return this.http.get<Product[]>(this.productsUrl, {
        params: tag ? { tag } : {},
      });
    }),
    map((products) => {
      return { data: products, error: null };
    }),
    catchError((err) => {
      return of({ data: [], error: err });
    })
  );

  private productsResult = toSignal(this.productsResult$, {
    initialValue: { data: [], error: null },
  });

  products = computed(() => {
    return this.productsResult().data;
  });

  error = computed(() => {
    return this.productsResult().error || this.tagsResult().error;
  });

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${productId}`)
  }


//   private url = 'https://fakestoreapi.com/products'
//   private categoriesUrl = 'https://fakestoreapi.com/products/categories'
//
//   selectedCategory = '/category/electronics';
//   selectedCategorySignal = signal<String>('/category/electronics');
//   categoryPrefix = '/category/';
//
//   constructor(private http: HttpClient) {
//     this.getProducts().subscribe();
//   }
//
//
//   // getProducts(): Observable<Product[]> {
//   //   return this.http.get<any[]>(this.url).pipe(
//   //     map(data => data.map(item => ({
//   //       id: item.id,
//   //       title: item.title,
//   //       price: item.price,
//   //       category: item.category,
//   //       description: item.description,
//   //       image: item.image
//   //     } as Product)))
//   //   );
//   // }
//
//   reloadProducts(){
//     this.getProducts().subscribe();
//   }
//
// reloadByCategory = computed(
//   () => {
//     this.selectedCategorySignal();
//     return this.getProducts();
//   }
// )
//
//   getProducts(): Observable<Product[]> {
//
//     return new Observable<Product[]>(observer => {
//       fetch(this.url + this.selectedCategorySignal())
//         .then(response => response.json())
//         .then(data => {
//           // console.log(data);
//           const products = data.map((item: any) => ({
//             id: item.id,
//             title: item.title,
//             price: item.price,
//             category: item.category,
//             description: item.description,
//             image: item.image
//           } as Product));
//           observer.next(products);
//           observer.complete();
//         })
//         .catch(error => observer.error(error));
//     });
//   }
//
//   getProductById(id: string): Observable<Product> {
//     return new Observable<Product>(observer => {
//       fetch(this.url + '/' + id)
//         .then(response => response.json())
//         .then(data => {
//           observer.next({
//             id: data.id,
//             title: data.title,
//             price: data.price,
//             category: data.category,
//             description: data.description,
//             image: data.image
//           } as Product);
//           observer.complete();
//         })
//         .catch(error => observer.error(error));
//     });
//   }
//
//   productsSignal = toSignal(this.getProducts(), { initialValue: [] });
//
//   products = computed(() => {
//     console.log('productsSignal', this.productsSignal());
//     return this.productsSignal();
//
//   });
//
//   getCategories(): Observable<string[]> {
//     return new Observable<string[]>(observer => {
//       fetch(this.categoriesUrl)
//         .then(response => response.json())
//         .then(data => {
//           observer.next(data);
//           observer.complete();
//         })
//         .catch(error => observer.error(error));
//     });
//   }
//
//   changeCategory(category: string) {
//     this.selectedCategorySignal.set(this.categoryPrefix + category);
//     console.log("Category changed in Product Service: " + category);
//   }
//
//
//
//   ngOnChanges() {
//     this.getProducts();
//   }
}


export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}
