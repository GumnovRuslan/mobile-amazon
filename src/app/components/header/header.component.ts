import { Component, OnInit } from '@angular/core';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MobileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  menuStep: number = 0
  categories = [
    {
      title: 'Mobile phones',
      image: 'assets/images/categories/mobile.png',
      alt: 'Mobile',
      type: 'mobiles',
    },
    {
      title: 'Tablets',
      image: 'assets/images/categories/tablet.png',
      alt: 'Tablets',
      type: 'Tablets',
    },
    {
      title: 'Wearables',
      image: 'assets/images/categories/wearable.png',
      alt: 'Wearables',
      type: 'Wearables',
    },
    {
      title: 'AirPods',
      image: 'assets/images/categories/airpods.png',
      alt: 'AirPods',
      type: 'Hearables',
    },
    {
      title: 'Games consoles',
      image: 'assets/images/categories/console.png',
      alt: 'Games consoles',
      type: 'GameConsoles',
    },
    {
      title: 'MacBooks',
      image: 'assets/images/categories/macbook.png',
      alt: 'MacBooks',
      type: 'Laptops',
    },
  ];

  ngOnInit(): void {
  }

  setStepMenu() {
    this.menuStep = (this.menuStep) ? --this.menuStep : ++this.menuStep
  }

  setActiveCategory() {
    this.menuStep = this.menuStep + 1
  }
}
