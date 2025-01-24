import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CartService {
    getCartCount(): number {
        return this.getCartItems().length;
    }

    getCartItems(): any[] {
        return JSON.parse(localStorage.getItem('cartItems') || '[]');
    }
    removeCartItem(oid: any): void {
        const cart = this.getCartItems();
        const filteredCart = cart.filter((item) => item.oid !== oid);
        localStorage.setItem('cartItems', JSON.stringify(filteredCart));
    }
    getIndividualCartCount(oid: any): number {
        const cart = this.getCartItems();
        const item = cart.find((item) => item.oid === oid);
        return item ? item.quantity : 0;
    }

    decrementCartQty(product: any): void {
        const cart = this.getCartItems();
        const index = cart.findIndex((item) => item.oid === product.oid);
        if(index !== -1) {
            cart[index].quantity -= 1;
            localStorage.setItem('cartItems', JSON.stringify(cart));
        }
    }

    updateCart(product: any): void {
        const cart = this.getCartItems();
        const index = cart.findIndex((item: any) => item.oid === product.oid);
        if(index !== -1) {
            cart[index].quantity += 1;
            localStorage.setItem('cartItems', JSON.stringify(cart));
        } else {
            product.quantity = 1;
            cart.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cart));
        }
    }

    getCartItemsTotalPrice(): number {
        const cart = this.getCartItems();
        return cart.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
    }
}
