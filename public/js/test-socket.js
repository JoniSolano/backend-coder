const socket = io();

const addProductform = document.getElementById("productForm");
const titleInput = document.getElementById("titleForm");
const descriptionInput = document.getElementById("descriptionForm");
const categoryInput = document.getElementById("categoryForm");
const priceInput = document.getElementById("priceForm");
const codeInput = document.getElementById("codeForm");
const stockInput = document.getElementById("stockForm");
const urlInput = document.getElementById("urlform");



// const deleteProductForm = document.getElementById("deleteProductForm");
// const id = document.getElementById("productId");

socket.on("products", (productsList) => {
  const productListContainer = document.getElementById("dinamic-list");
  productListContainer.innerHTML = "";

  productsList.forEach((product) => {
    const productHTML = `
    <div class="col-md-3">
      <div class="card">
        <img class="card-img-top" src=${product.thumbnail[0]} alt="" />
        <div class="card-body">
          <h2 class="card-title">${product.title}</h2>
          <p class="card-text">${product.description}</p>
          <p class="card-text">ID: ${product.id}</p>
          <p class="card-text">Código: ${product.code}</p>
          <p class="card-text">Categoría: ${product.category}</p>
          <p class="card-text">Stock: ${product.stock}</p>
          <p class="card-text">Precio: $${product.price}</p>
          <p class="card-text">Status: ${product.status}</p>
        </div>
      </div>
    </div>`;

    productListContainer.insertAdjacentHTML("beforeend", productHTML);
  });
});

addProductform.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: titleInput.value,
    description: descriptionInput.value,
    code: codeInput.value,
    thumbnail: urlInput.value,
    stock: stockInput.value,
    price: priceInput.value,
  };
  socket.emit("new-product", newProduct);
  addProductform.reset();
});



// deleteProductForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   socket.emit("delete-product", parseInt(productId.value));
//   deleteProductForm.reset();
// });