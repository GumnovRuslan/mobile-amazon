import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ICategory {
  title: string;
  image: string;
  alt: string;
  link?: string;
  brands?: any;
}

@Component ({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})

export class CategoryCardComponent implements OnInit{
  @Input() data!: any;
  @Input() link!: string;

  constructor() {
   
  }

  ngOnInit(): void {
  }
}
