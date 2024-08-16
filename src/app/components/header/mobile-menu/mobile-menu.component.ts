import { Component, OnInit, Input } from '@angular/core';
import { CategoryCardComponent } from '../../card/category-card/category-card.component';
import { BrandCardComponent } from '../../card/brand-card/brand-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent, BrandCardComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})


export class MobileMenuComponent implements OnInit{
  @Input() categories!: any;
  @Input() step!: number;
  @Input() setActiveCategory!: () => void

  constructor() {
  }

  ngOnInit(): void {
  }
}
