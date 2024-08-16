import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBrand } from '../../../types/productType';

@Component({
  selector: 'app-brand-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-card.component.html',
  styleUrl: './brand-card.component.scss'
})
export class BrandCardComponent implements OnInit{
  @Input() type: 'slide' | 'default' = 'default'
  @Input() data: any
  @Input() select: boolean = false
  
  constructor(){}

  ngOnInit(): void {
    
  }
}
