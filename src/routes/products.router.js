import express from "express"
import ProductManager from "../functions/productManager.js";

export const productsRouter = express.Router();

const productManager = new ProductManager("products.json");

productsRouter.get("/", async(req, res) => {
  let products = await productManager.getProducts()
  let {limit} = req.query
  limit = parseInt(limit)

  if (limit) {
    const limitedProd = products.slice(0, limit)
    res.status(200).json({
      status: "success",
      msg: `Mostrando los ${limit} productos`,
      data: limitedProd,
  })
  }else {
    res.status(200).json({
      status: "success",
      msg: `Mostrando los ${products.length} productos`,
      data: products,
    })
  }
})

productsRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  let product = await productManager.getProductsById(parseInt(id))
  res.status(200).json({
    status: "success",
    msg: `Mostrando el producto con ID ${product.id}`,
    data: product,
  })
})

productsRouter.post("/", (req, res) => {
  const prod = req.body;
  productManager.addProducts(prod);
  res.status(200).json({
    status: "success",
    msg: `producto creado`,
    data: prod
  })
});

productsRouter.put("/:pid", (req, res) => {
  let id = req.params.pid;
  const updatedProduct = req.body;
  productManager.updateProduct(parseInt(id), updatedProduct);
  res.status(200).json({
    status: "success",
    msg: "Producto modificado.",
    data: updatedProduct,
    });
});

productsRouter.delete("/:pid", (req, res) => {
  try {
    let id = req.params.pid;
    productManager.deleteProduct(parseInt(id));
    res.status(200).json({
      status: "success",
      msg: "Producto eliminado.",
      data: {},
      });
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      msg: "Error en el servidor",
      data: {},
    });
  }
});

