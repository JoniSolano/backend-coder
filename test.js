const fs = require('fs');

class ProductManager {
    constructor(path){
        this.path = (path);
        this.products = [];
        let data = fs.readFileSync(this.path, "utf-8");
        let dataParse = JSON.parse(data);
        this.products = dataParse;
    }

    getProducts() {
        return this.products;
    }

    addProducts (product) {

        const existingProduct = this.products.some((prod) => prod.code === product.code);


        if (product.title ===undefined ||
            product.description ===undefined ||
            product.price ===undefined ||
            product.thumbnail ===undefined ||
            product.code ===undefined ||
            product.stock ===undefined 
            ){
            console.log('Error! Please add a product');
            return;
        } else if (existingProduct) {
            console.log('This product already exists');
            return;
        } else {
            this.products.push({...product, id: this.products.length +1})
            let productsString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productsString, 'utf-8');
            console.log("Added product");
            return;
        };
    }

    updateProduct (id, updatedProduct) {
        
        const prodIndex = this.products.findIndex((product) => product.id === id);
        this.products[prodIndex] = updatedProduct;
        let productsString = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsString, 'utf-8');
        console.log(this.products)
    }

    deleteProduct (id) {
        const prodIndex = this.products.findIndex((product) => product.id === id);
        if (prodIndex === -1) {
            console.log('Product not found');
            return;
        }else {
            this.products.splice(prodIndex, 1);
            let productsString = JSON.stringify(this.products);
            fs.writeFileSync(this.path, productsString, 'utf-8');
            console.log('Removed product');
        }
    }

    getProductsById(id){
        const product = this.products.find(product => product.id === id);

        if (!product) {
            console.log(`The "id: ${id}" does not exist`);
            return;
        }else {
            return product;
        }
    }

}


const item = new ProductManager("test.json");


// Llama al getProduct.
console.log(item.getProducts());

// Agrega el producto.
item.addProducts({
    title: "Test product",
    description: "This is a test product",
    price: 200,
    thumbnail: "Without image",
    code: "abc123",
    stock: 25,
})
console.log(item.getProducts());

// Llama a un producto por un ID existente.
console.log(item.getProductsById(1));
// Llama a un producto por un ID inexistente.
console.log(item.getProductsById(5));

// Actualiza un producto.
const updatedProduct = {
    id: 1,
    title: "New title",
    description: "New description",
    price: 4000,
    thumbnail: "New image",
    code: "abc1234",
    stock: 6,
}
item.updateProduct(1, updatedProduct);
console.log(item.getProducts());

// Elimina un producto.
item.deleteProduct(1);
console.log(item.getProducts());

