import { Routes } from '@angular/router';
import {BlogComponent} from './blog/blog.component';
import {CatalogComponent} from './catalog/catalog.component';
import {DetailsComponent} from './details/details.component';
import {FavComponent} from './fav/fav.component';
import {BasketComponent} from './basket/basket.component';

export const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'catalog/details/:detailsId',
    component: DetailsComponent,
  },
  {
    path: 'fav',
    component: FavComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
  }
];
