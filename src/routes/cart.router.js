import express from "express"
import CartManager from "../functions/cartManager.js";
import ProductManager from "../functions/productManager.js";

const productManager = new ProductManager("products.json");

export const cartRouter = express.Router();

const cartManager = new CartManager("cart.json");

cartRouter.get("/", (req, res) => {
  const carts = cartManager.getCart();
  res.status(200).json(carts)
});

cartRouter.post("/", (req, res) => {
  const newCart = cartManager.createCart();
  res.status(200).json({
    status: "success",
    msg: `Carrito creado`,
    data: newCart
  });
})

cartRouter.get("/:cid", (req, res) => {
  const cartId = req.params.cid
  const cartEcontrado = cartManager.getCartById(parseInt(cartId));
  
  if(cartEcontrado) {
    res.status(200).json({
      status: "success",
      msg: `Productos del carrito ${cartId}`,
      data: cartEcontrado
    });
  } else {
    res.status(400).json({status: "error", msg: `Carrito ${cartId} no encontrado`})
  }
})

cartRouter.post("/:cid/products/:pid", (req, res) => {
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
  res.json({
    status: "success",
    msg: `Producto ${productId} agregado al carrito ${cartId}`,
    data: cart
  })
})
