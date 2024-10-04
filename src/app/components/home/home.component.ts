import { Component } from '@angular/core';
import { SideMenuComponent } from "../side-menu/side-menu.component";
import { ProductsComponent } from "../products/products.component";
import { FormsModule } from '@angular/forms';
import { CreditCardFormatPipe } from "../../pipes/credit-card-format.pipe";
import { IProduct } from '../../models/product.model';
import { ICategory } from '../../models/icategory';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SideMenuComponent, ProductsComponent, FormsModule, CreditCardFormatPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  filterPrice!: number

  productsInCart:IProduct[]=[];

  selectedID:number = 0;

  handleAddToCart(product:IProduct){
    const existingProduct = this.productsInCart.find(item => item.id == product.id);

    existingProduct? existingProduct.count++ : this.productsInCart.push(product)
  }
  get totalPrice() {
    let total = 0;
    this.productsInCart.forEach(item => total += item.price * item.count);
    return total;
  }
  categories: ICategory[] = [
    { categoryID: 1, Name: 'Table' },
    { categoryID: 2, Name: 'Chair' },
    { categoryID: 3, Name: 'TV Unit' }
  ];
}
