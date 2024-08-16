import { Component, Input } from '@angular/core';
import { CategoryCardComponent } from '../card/category-card/category-card.component';

interface IGradient {
  top: string
  bottom: string
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})


export class SliderComponent {
  @Input() gradient: IGradient = {top: '#1331AB', bottom: '#fff'}
  @Input() title: string = 'Featured Categories'

  getGradient() {
    return `linear-gradient(${this.gradient.top} 15% 18%, ${this.gradient.bottom} 55%)`
  }
}
