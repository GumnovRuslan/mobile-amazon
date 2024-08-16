import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card-variation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card-variation.component.html',
  styleUrl: './product-card-variation.component.scss'
})

export class ProductCardVariationComponent implements OnInit{
  @Input() data: any

  activeItem: number = 0
  imageUrl: any

  constructor(
  ) {}


  ngOnInit(): void {
    this.imageUrl = this.data.products[this.activeItem].ImageURL

    // this.checkImage(this.imageUrl).then(bool => {
    //   if (!bool) this.imageUrl = 'assets/images/default-img-devise.png'
    // });
  }

  setActiveItem(index: number) {
    this.activeItem = index
  }

  checkImage(url: string) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
  }
}
