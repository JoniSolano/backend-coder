import express from "express"
import CartManager from "../functions/cartManager.js";

export const cartRouter = express.Router();

const cartManager = new CartManager("cart.json");

cartRouter.get("/", (req, res) => {
  const carts = cartManager.getCart();
  res.status(200).json(carts)
});

cartRouter.get("/cid", (req, res) => {
  const cartId = req.params.cid
  const cart = cartManager.getCartById(parseInt(cartId));
  
  if(cart) {
    res.status(200).json(cart.products);
  } else {
    res.status(400).json({status: "error", msg: `Carrito ${cartId} no encontrado`})
  }
})

cartRouter.post("/", (req, res) => {
  newCart = cartManager.createCart();
  res.status(200).json(newCart);
})

cartRouter.post("/:cid/product/:pid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const cart = cartManager.getCartById(cartId);
  if (!cart) {
    res.status(404).json({status: "error", msg: `Carrito ${cartId} no econtrado`})
  }

  const product = cartManager.getProductById(productId);
  if (!product) {
    res.status(404).json({msg: `Producto ${productId} no encontrado`})
  }
  cartManager.addProductToCart(cartId, productId);
  res.json({msg: `Producto ${productId} agregado al carrito ${cartId}`})
})