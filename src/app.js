import express from "express";
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import { cartRouter } from "./routes/cart.router.js";
import { productsRouter } from "./routes/products.router.js";
import { homeRouter } from "./routes/home.router.js";
import { realTimeProductsRouter } from "./routes/realtimeproducts.router.js";
import { __dirname } from "./utils.js";


const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})

const socketServer = new Server(httpServer)
;
socketServer.on('connection',(socket)=>{
  socket.on('msg_front_back',(allProd)=>{
      socketServer.emit('msg_back_front', allProd)
  })
  
})

app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);


app.use("/home",homeRouter)
app.use("/realtimeproducts",realTimeProductsRouter)


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
   