import { Router, RouterModule } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct, DiscountOffers } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCardDirective } from '../../directives/product-card.directive';
import { CategoryService } from '../../services/category.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardDirective,MatIconModule,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  clientName: string = 'Mostafa Moawed';
  discount: DiscountOffers = DiscountOffers.NoDiscount;
  isPurchased = false;
  currentDate:Date = new Date();
  ProductsById!: IProduct[];


  constructor(private productsService:ProductsService, private router:Router, private categoryService:CategoryService) {}


ngOnInit() {
  //6
  this.productsService.getProducts().subscribe((products) => {this.ProductsById = products})
}

  togglePurchase() {
    this.isPurchased = !this.isPurchased;
  }


  buyProduct(product: IProduct) {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }

  // @Input() set filterValue(price:number){
  //   this.ProductsByPrice = this.getFilteredPrice(price)
  // }

  // getFilteredPrice(filterPrice: number){
  //   return this.productsService.getProductsByPrice(filterPrice)
  // }



  @Output() addNewProductEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>()

  addToCart(product: IProduct){
    this.addNewProductEvent.emit(product)
  }

  viewDetails(id: number){
    this.router.navigate(['/product', id])
  }



//6
  @Input() set selectedValue(value:number){
    this.categoryService.getCategoryById(value.toString()).subscribe(data=>{this.ProductsById = data})
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe(() => {
        this.ProductsById = this.ProductsById.filter(product => product.id !== id); 
      });
    }
  }

}
