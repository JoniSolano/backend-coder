import express from "express"
import { productsRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/cart.router.js";


const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})

app.use("/products", productsRouter);
app.use("/cart", cartRouter);


app.get("/", (req, res) => {
  res.send('Comision 51395 -- Desafio n°3 || Solano Jonathan Ariel')
  });

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "No se encuentra esa ruta",
    data: {}
  });
});
   