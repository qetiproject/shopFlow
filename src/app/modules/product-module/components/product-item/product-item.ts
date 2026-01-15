import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { ProductViewModel } from "@product-module";

@Component({
    selector: 'product-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-item.html'
})
export class ProductItem {
    product = input.required<ProductViewModel>();
}