import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ProductViewModel } from "@product-module";

@Component({
    selector: 'product-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-item.html'
})
export class ProductItem {
    @Input({ required: true}) product!: ProductViewModel; 
}