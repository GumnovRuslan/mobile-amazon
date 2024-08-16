import { Component } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { ProductCardVariationComponent } from '../card/product-card-variation/product-card-variation.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchInputComponent, ProductCardVariationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
