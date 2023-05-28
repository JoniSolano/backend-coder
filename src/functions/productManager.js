import fs from "fs"

export default class ProductManager {
    constructor(path){
        this.path = (path);
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8")) || [];
    }

    getProducts() {
        return this.products;
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
            let newProduct = {...product, id: this.products.length +1}
            this.products.push(newProduct)
            let productsString = JSON.stringify(this.products)
            fs.writeFileSync(this.path, productsString, 'utf-8');
            console.log("Added product");
            return;
        };
    }

    updateProduct (id, updatedProduct) {
        
        const prodIndex = this.products.findIndex((product) => product.id === id);
        
        if (prodIndex === -1) {
            console.log(`Producto no encontrado`)
            return;
        }

        this.products[prodIndex] = {
            ...updatedProduct,
            id,
        };
        let productsString = JSON.stringify(this.products);
        fs.writeFileSync(this.path, productsString, 'utf-8');
        console.log(`Producto ${id} modificado`)
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
}


// const item = new ProductManager("products.json");

// // Llama al getProduct.
// console.log(item.getProducts());

// // Agrega el producto.
// item.addProducts({
//     title: "Test product",
//     description: "This is a test product",
//     price: 200,
//     thumbnail: "Without image",
//     code: "abc123",
//     stock: 25,
// })
// console.log(item.getProducts());

// // Llama a un producto por un ID existente.
// console.log(item.getProductsById(1));
// // Llama a un producto por un ID inexistente.
// console.log(item.getProductsById(5));

// // Actualiza un producto.
// const updatedProduct = {
//     id: 1,
//     title: "New title",
//     description: "New description",
//     price: 4000,
//     thumbnail: "New image",
//     code: "abc1234",
//     stock: 6,
// }
// item.updateProduct(1, updatedProduct);
// console.log(item.getProducts());

// // Elimina un producto.
// item.deleteProduct(1);
// console.log(item.getProducts());