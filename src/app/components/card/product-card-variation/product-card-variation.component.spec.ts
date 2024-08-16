import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardVariationComponent } from './product-card-variation.component';

describe('ProductCardVariationComponent', () => {
  let component: ProductCardVariationComponent;
  let fixture: ComponentFixture<ProductCardVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardVariationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
