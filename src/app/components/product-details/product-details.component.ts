
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  product: IProduct | undefined;
  productId: number = 0;
  previousProductId?: number;
  nextProductId?: number;
  allProducts: IProduct[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {

    // this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // let item = this.productsService.getProductById(this.productId);
    // console.log(item);
    // item ? this.product = item : this.router.navigate(['/products'])


    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      this.getProduct();
    });
  }

  getProduct():void{

    this.productsService.getProductById(this.productId.toString()).subscribe((product)=>{
      this.product = product
    })

    this.productsService.getProducts().subscribe((products) => {
      this.allProducts = products;
      this.previousProductId = this.getPreviousProductId(this.productId);
      this.nextProductId = this.getNextProductId(this.productId);
    });
  }

  getPreviousProductId(id: number): number | undefined {
    const index = this.allProducts.findIndex(product => product.id == id);
    return index > 0 ? this.allProducts[index - 1].id : undefined;
  }

  getNextProductId(id: number): number | undefined {
    const index = this.allProducts.findIndex(product => product.id == id);
    return index < this.allProducts.length - 1 ? this.allProducts[index + 1].id : undefined;
  }


  nextProduct(): void {
    if (this.nextProductId) {
      this.router.navigate(['/product', this.nextProductId]);
    }
  }

  previousProduct(): void {
    if (this.previousProductId) {
      this.router.navigate(['/product', this.previousProductId]);
    }
  }

}
