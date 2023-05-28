const socket = io();

const addProductform = document.getElementById("productForm");
const titleInput = document.getElementById("titleForm");
const descriptionInput = document.getElementById("descriptionForm");
const categoryInput = document.getElementById("categoryForm");
const priceInput = document.getElementById("priceForm");
const codeInput = document.getElementById("codeForm");
const stockInput = document.getElementById("stockForm");
const urlInput = document.getElementById("urlform");



const deleteProductForm = document.getElementById("deleteProductForm");
const productId = document.getElementById("productId");

socket.on("products", (productsList) => {
  const productListContainer = document.getElementById("dinamic-list");
  productListContainer.innerHTML = "";

  productsList.forEach((product) => {
    const productHTML = `
    <div>
      <div">
        <img style="width: 50px; max-height: 50px" src=${product.thumbnail} alt=""/>
        <div>
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p>ID: ${product.id}</p>
          <p>Código: ${product.code}</p>
          <p>Categoría: ${product.category}</p>
          <p>Stock: ${product.stock}</p>
          <p>Precio: $${product.price}</p>
          <p>Status: ${product.status}</p>
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



deleteProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("delete-product", parseInt(productId.value));
  deleteProductForm.reset();
});