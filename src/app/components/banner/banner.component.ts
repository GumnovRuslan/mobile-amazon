import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})

export class BannerComponent {
  @Input() data: any = {name: 'default', image: 'assets/images/iphone_12.png'}
}
