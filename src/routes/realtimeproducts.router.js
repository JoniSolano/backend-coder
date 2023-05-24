import express from "express"
import ProductManager from "../functions/productManager.js";
const productManager = new ProductManager("products.json");

export const realTimeProductsRouter = express.Router()

realTimeProductsRouter.get('/', (req,res)=>{
    try{
        let products = productManager.getProducts()

        return res
        .status(200)
        .render('realtimeproducts', {products})
    }
    catch (error) {
        return res.status(500).json({ status: "error", msg: "Error al obtener los productos" })
    }
    
})