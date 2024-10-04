import { Component } from '@angular/core';
import { INewProduct } from '../../models/new-product.model';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {
  product: INewProduct ={} as INewProduct 
  productId: number | null = null;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id'));
      if (this.productId) {
        this.productService.getProductById(this.productId.toString()).subscribe(product => {
          this.product = product; 
        })
      }
    })
  }

  addProduct() {
    if (this.productId) {
      this.productService.updateProduct(this.productId, this.product).subscribe(() => {
        this.router.navigate(['/home']); 
      });
    } else {
      this.productService.addProduct(this.product).subscribe(newProduct => {
        console.log(newProduct);
        this.router.navigate(['/home']); 
      });
    }
  }

}
