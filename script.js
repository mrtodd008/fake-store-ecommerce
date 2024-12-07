const apiUrl = "https://fakestoreapi.com/products";
let products = [];

document.addEventListener("DOMContentLoaded", async () => {
  await fetchProducts();
  displayProducts(products);
});

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    products = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayProducts(productsToDisplay) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("col-md-3", "mb-4");
  card.innerHTML = `
    <div class="card" style="width: 18rem;">
      <div class="position-relative">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <span class="card-icon">${getCategoryIcon(product.category)}</span>
      </div>
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-category">${capitalizeFirstLetter(product.category)}</p>
        <p class="card-price">$${product.price.toFixed(2)}</p>
        <p class="card-text">${product.description.substring(0, 100)}...</p>
      </div>
    </div>
  `;
  return card;
}

function getCategoryIcon(category) {
  const icons = {
    electronics: "📱",
    jewelery: "💍",
    "men's clothing": "👕",
    "women's clothing": "👗",
  };
  return icons[category] || "🛒";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Filter products by category
function filterProductsByCategory() {
  const category = document.getElementById("category").value;
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);
  displayProducts(filteredProducts);
}

// Search products by title
function searchProducts() {
  const searchQuery = document.getElementById("search").value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );
  displayProducts(filteredProducts);
}

// Sort products by selected criteria
function sortProducts() {
  const sortBy = document.getElementById("sort").value;
  let sortedProducts;

  switch (sortBy) {
    case "price-asc":
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
      break;
    case "title-asc":
      sortedProducts = [...products].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;
    case "title-desc":
      sortedProducts = [...products].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      break;
    default:
      sortedProducts = products;
  }

  displayProducts(sortedProducts);
}
