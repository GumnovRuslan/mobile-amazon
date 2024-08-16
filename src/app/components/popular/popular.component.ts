import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent } from '../card/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent implements OnInit{
  @Input() title: string = 'Popular Title'

  constructor() {
  }

  ngOnInit(): void {
  }
}
