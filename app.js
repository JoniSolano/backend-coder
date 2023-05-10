import express from "express"
import ProductManager from "./productManager.js";

const productManager = new ProductManager("products.json");
const app = express()
const PORT = 8080

app.get("/", (req, res) => {
  res.send('Comision 51395 -- Desafio n°3 || Solano Jonathan Ariel')
  });

app.get("/products", async(req, res) => {
  let products = await productManager.getProducts()
  let {limit} = req.query
  limit = parseInt(limit)

  if (limit) {
    res.status(200).send(products.slice(0, limit))
  }else {
    res.status(200).send(products)
  }
})

app.get("/products/:pid", async (req, res) => {
  const id = req.params.pid;
  let product = await productManager.getProductsById(parseInt(id))
  res.status(200).send(product)
})



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

   