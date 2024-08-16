import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BannerComponent } from '../../components/banner/banner.component';
import { PopularComponent } from '../../components/popular/popular.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { BrandCardComponent } from '../../components/card/brand-card/brand-card.component';
import { ProductsComponent } from '../../components/products/products.component';
import { SearchComponent } from '../../components/search/search.component';
import { CommonModule } from '@angular/common';
import { products, popularDevices, brandsAll } from '../../../globalData';
import { ProductCardVariationComponent } from '../../components/card/product-card-variation/product-card-variation.component';
import { getVariationsProduct } from '../../utils/getVariationsProduct';
import { IBrand } from '../../types/productType';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardVariationComponent,
    SearchComponent,
    BannerComponent,
    PopularComponent,
    BrandCardComponent,
    SliderComponent,
    ProductsComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  currentPath: string | undefined
  bannerData: any = {
    mobiles: {
      name: 'mobiles',
      image: 'assets/images/categories/mobile.png',
    },
    tablets: {
      name: 'tablets',
      image: 'assets/images/categories/tablet.png',
    },
    wearables: {
      name: 'wearables',
      image: 'assets/images/categories/wearable.png',
    },
    hearables: {
      name: 'hearables',
      image: 'assets/images/categories/airpods.png',
    },
    consoles: {
      name: 'game-consoles',
      image: 'assets/images/categories/console.png',
    },
    laptops: {
      name: 'laptops',
      image: 'assets/images/categories/macbook.png',
    },
  }
  avalibleBrands: IBrand[] = []
  activeCatalog: string = 'mobiles'
  popularDevices: any
  popularTitle: string = 'Our most popular '

  productsData: any = []
  brandIndex: number = 0
  productBrandActive: string = 'apple'

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentPath = this.route.snapshot.routeConfig?.path
    console.log(this.currentPath)
    if(this.currentPath) {
      this.activeCatalog = this.bannerData[this.currentPath];
      this.popularDevices = getVariationsProduct(popularDevices[this.currentPath]);
      this.popularTitle += this.currentPath
      this.avalibleBrands = this.getAvalibleBrands(products[this.currentPath])
      console.log(this.avalibleBrands)
      this.productBrandActive = this.avalibleBrands[this.brandIndex].name
      this.productsData = getVariationsProduct(products[this.currentPath][this.productBrandActive])
    }
  }

  getAvalibleBrands(products: any) {
    const brandsArray = [] 
    for(let brand in products) brandsArray.push(brandsAll[brand])
    return brandsArray
  }

  setAvalibleBrand(brandName: string, category: any): void {
    this.brandIndex = this.avalibleBrands.findIndex(brand => brand.name === brandName)
    this.productBrandActive = this.avalibleBrands[this.brandIndex].name
    this.productsData = getVariationsProduct(products[category.name][this.productBrandActive])
  }
}
