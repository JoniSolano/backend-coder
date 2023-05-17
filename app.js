import express from "express"
import ProductManager from "./productManager.js";

const productManager = new ProductManager("products.json");
const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

app.get("/", (req, res) => {
  res.send('Comision 51395 -- Desafio n°3 || Solano Jonathan Ariel')
  });

app.get("/products", async(req, res) => {
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

app.get("/products/:pid", async (req, res) => {
  const id = req.params.pid;
  let product = await productManager.getProductsById(parseInt(id))
  res.status(200).json({
    status: "success",
    msg: `Mostrando el producto con ID ${product.id}`,
    data: product,
  })
})

app.post("/products", (req, res) => {
  const prod = req.body;
  productManager.addProducts(prod);
  res.status(200).json({
    status: "success",
    msg: `producto creado`,
    data: prod
  })
});

app.put("/products/:pid", (req, res) => {
  let id = req.params.pid;
  const updatedProduct = req.body;
  productManager.updateProduct(parseInt(id), updatedProduct);
  res.status(200).json({
    status: "success",
    msg: "Producto modificado.",
    data: updatedProduct,
    });
});

app.delete("/products/:pid", (req, res) => {
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


app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No se encuentra esa ruta",
    data: {}
  });
});
   