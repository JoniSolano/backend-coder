import fs from "fs"
import ProductManager from "./productManager.js";

const productManager = new ProductManager("products.json");

export default class  CartManager {
    constructor(path){
        this.path = path;
        this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8")) || [];
    }

    createCart() {
        const newCart = {id: this.carts.length + 1, products: []};
        
        this.carts.push(newCart);
        fs.writeFileSync(this.path, JSON.stringify(this.carts), 'utf-8');
        return newCart;
    }

    getCart() {
        return this.carts;
    }

    getCartById(id) {
        const cartFound = this.carts.find(product => product.id === id);

        if (!cartFound) {
            console.log(`Not found`);
            return;
        }else {
            return cartFound;
        }
    }

    addProductToCart(cartId, productId) {
        const cart = this.carts.find((cart) => cart.id === cartId);

        const existingProduct = cart.products.find((product) => product.id === productId);

        if(existingProduct) {
            existingProduct.quantity++;
        }else {
            const product = this.getProductById(productId);
            if (!product) {
                return;
            }

            cart.products.push({
                id: productId,
                quantity: 1,
            });
        }

        fs.writeFileSync(this.path, JSON.stringify(this.carts), 'utf-8');
        console.log("Producto agregado al carrito correctamente")      
    }

    async getProductById(id) {
        const product = await productManager.getProductById(id);
        console.log(product)
        return product;
      }
}