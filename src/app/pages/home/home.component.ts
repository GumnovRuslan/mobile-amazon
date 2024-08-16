import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { PopularComponent } from '../../components/popular/popular.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { SearchComponent } from '../../components/search/search.component';
import { CategoryCardComponent } from '../../components/card/category-card/category-card.component';
import { CommonModule } from '@angular/common';
import { ProductCardVariationComponent } from "../../components/card/product-card-variation/product-card-variation.component";
import { popularDevices } from '../../../globalData';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    BannerComponent,
    SliderComponent,
    PopularComponent,
    CategoryCardComponent,
    ProductCardVariationComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  categories = [
    {
      title: 'Mobile phones',
      image: 'assets/images/categories/mobile.png',
      alt: 'Mobile',
      type: 'mobiles',
      href: 'mobiles',
    },
    {
      title: 'Tablets',
      image: 'assets/images/categories/tablet.png',
      alt: 'Tablets',
      type: 'Tablets',
      href: 'tablets'
    },
    {
      title: 'Wearables',
      image: 'assets/images/categories/wearable.png',
      alt: 'Wearables',
      type: 'Wearables',
      href: 'wearables',
    },
    {
      title: 'AirPods',
      image: 'assets/images/categories/airpods.png',
      alt: 'AirPods',
      type: 'Hearables',
      href: 'hearables',
    },
    {
      title: 'Games consoles',
      image: 'assets/images/categories/console.png',
      alt: 'Games consoles',
      type: 'GameConsoles',
      href: 'consoles',
    },
    {
      title: 'MacBooks',
      image: 'assets/images/categories/macbook.png',
      alt: 'MacBooks',
      type: 'Laptops',
      href: 'laptops',
    },
  ];
  popularDevices = popularDevices['mobiles']

  constructor(
  ) {}

  ngOnInit(): void {
  }
}
