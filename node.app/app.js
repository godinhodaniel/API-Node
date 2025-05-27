// API base URL
const API_BASE_URL = 'http://localhost:8090/api';

// Function to fetch all products
async function fetchProducts() {
    try {
        console.log('Fetching products from:', `${API_BASE_URL}/produtos`);
        const response = await fetch(`${API_BASE_URL}/produtos`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        console.log('Received products:', products);
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to fetch a single product
async function fetchProduct(id) {
    try {
        console.log('Fetching product with ID:', id);
        const response = await fetch(`${API_BASE_URL}/produtos/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const product = await response.json();
        console.log('Received product:', product);
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Function to create a product card
function createProductCard(product) {
    console.log('Creating card for product:', product);
    return `
        <div class="col-6 col-md-4 col-lg-3">
            <a href="details.html?product=${product.Id}" class="text-decoration-none">
                <div class="card product-card">
                    <img src="${product.Imagem || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${product.Nome}">
                    <div class="card-body">
                        <h5 class="card-title">${product.Nome}</h5>
                        <p class="card-text">${product.Descricao || ''}</p>
                        <p class="card-text"><strong>Preço: R$ ${product.Preco || '0.00'}</strong></p>
                    </div>
                </div>
            </a>
        </div>
    `;
}

// Function to create carousel items
function createCarouselItem(product, isActive = false) {
    return `
        <div class="carousel-item ${isActive ? 'active' : ''}">
            <div class="card product-card">
                <img src="${product.Imagem || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${product.Nome}">
                <div class="card-body">
                    <h5 class="card-title">${product.Nome}</h5>
                    <p class="card-text">${product.Descricao || ''}</p>
                </div>
            </div>
        </div>
    `;
}

// Function to load products on the home page
async function loadProducts() {
    console.log('Loading products...');
    const products = await fetchProducts();
    const productGrid = document.querySelector('.row.g-3');
    const carouselInner = document.querySelector('.carousel-inner');
    
    if (productGrid && products.length > 0) {
        console.log('Updating product grid with', products.length, 'products');
        productGrid.innerHTML = products.map(product => createProductCard(product)).join('');
    } else {
        console.log('No products found or product grid element not found');
    }

    // Update carousel
    if (carouselInner && products.length > 0) {
        console.log('Updating carousel with', products.length, 'products');
        carouselInner.innerHTML = products
            .slice(0, 3) // Only show first 3 products in carousel
            .map((product, index) => createCarouselItem(product, index === 0))
            .join('');
    }
}

// Function to load product details
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId) {
        console.log('Loading product details for ID:', productId);
        const product = await fetchProduct(productId);
        if (product) {
            console.log('Updating product details with:', product);
            document.querySelector('.product-title').textContent = product.Nome;
            document.querySelector('.product-description').textContent = product.Descricao || '';
            document.querySelector('.product-price').textContent = `R$ ${product.Preco || '0.00'}`;
            document.querySelector('.product-image').src = product.Imagem || 'https://via.placeholder.com/300';
        } else {
            console.log('Product not found');
        }
    } else {
        console.log('No product ID provided in URL');
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing...');
    // Check if we're on the home page or details page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        console.log('On home page, loading products...');
        loadProducts();
    } else if (window.location.pathname.includes('details.html')) {
        console.log('On details page, loading product details...');
        loadProductDetails();
    }
}); 