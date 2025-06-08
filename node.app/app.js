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
        throw error;
    }
}

// Function to create a product card
function createProductCard(product) {
    return `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card product-card h-100">
                <img src="${product.Imagem || 'https://via.placeholder.com/300'}" class="card-img-top" alt="${product.Nome}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.Nome}</h5>
                    <p class="card-text"><strong>Preço: R$ ${product.Preco || '0.00'}</strong></p>
                    <a href="details.html?product=${product.Id}" class="btn btn-primary btn-sm mt-auto">Details</a>
                </div>
            </div>
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

// Function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to update carousel items
function updateCarouselItems(products) {
    const carouselInner = document.querySelector('.carousel-inner');
    if (carouselInner && products.length > 0) {
        console.log('Updating carousel with random products');
        // Shuffle the products array
        const shuffledProducts = shuffleArray([...products]);
        // Take first 4 products or all if less than 4
        const carouselProducts = shuffledProducts.slice(0, Math.min(4, shuffledProducts.length));
        
        carouselInner.innerHTML = carouselProducts
            .map((product, index) => createCarouselItem(product, index === 0))
            .join('');
    }
}

// Function to load products on the home page
async function loadProducts() {
    console.log('Loading products...');
    const products = await fetchProducts();
    const productGrid = document.querySelector('.row.g-3');
    
    if (productGrid && products.length > 0) {
        console.log('Updating product grid with', products.length, 'products');
        // Get the add button card
        const addButtonCard = productGrid.querySelector('.add-product-card').parentElement;
        // Update the grid while preserving the add button
        productGrid.innerHTML = products.map(product => createProductCard(product)).join('');
        // Add back the add button card
        productGrid.appendChild(addButtonCard);
    } else {
        console.log('No products found or product grid element not found');
    }

    // Initial carousel update
    updateCarouselItems(products);

    // Set up periodic carousel updates
    if (products.length > 0) {
        // Clear any existing interval
        if (window.carouselInterval) {
            clearInterval(window.carouselInterval);
        }
        
        // Set new interval to update carousel every 5 seconds
        window.carouselInterval = setInterval(() => {
            updateCarouselItems(products);
        }, 5000);
    }
}

// Function to load product details
async function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (!productId) {
        document.querySelector('.container.my-5').innerHTML = '<div class="alert alert-danger">No product ID provided</div>';
        return;
    }

    try {
        console.log('Loading product details for ID:', productId);
        const product = await fetchProduct(productId);
        console.log('Received product data:', product);

        if (product) {
            // Update all product details
            document.querySelector('.product-title').textContent = product.Nome || 'No Name';
            document.querySelector('.product-description').textContent = product.Descricao || 'No description available';
            document.querySelector('.product-price').textContent = `R$ ${product.Preco ? product.Preco.toFixed(2) : '0.00'}`;
            document.querySelector('.product-image').src = product.Imagem || 'https://via.placeholder.com/300';
            document.querySelector('.product-image').alt = product.Nome || 'Product Image';
            
            // Update additional details
            const stockElement = document.querySelector('.product-stock');
            if (stockElement) {
                stockElement.textContent = product.QuantidadeEstoque || '0';
            }
            
            const ratingElement = document.querySelector('.product-rating');
            if (ratingElement) {
                ratingElement.textContent = product.Avaliacao ? product.Avaliacao.toFixed(1) : 'No rating';
            }
            
            const categoryElement = document.querySelector('.product-category');
            if (categoryElement) {
                categoryElement.textContent = product.Categoria || 'Uncategorized';
            }

            // Add product code if available
            const codeElement = document.querySelector('.product-code');
            if (codeElement) {
                codeElement.textContent = product.Codigo || 'No code';
            }

            // Show the product details container
            document.querySelector('.container.my-5').style.display = 'block';
        } else {
            console.error('Product not found');
            document.querySelector('.container.my-5').innerHTML = '<div class="alert alert-danger">Product not found</div>';
        }
    } catch (error) {
        console.error('Error loading product details:', error);
        document.querySelector('.container.my-5').innerHTML = '<div class="alert alert-danger">Error loading product details</div>';
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
    // Add product form handler
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const formData = new FormData(addProductForm);
                const product = Object.fromEntries(formData.entries());
                
                // Convert numeric fields
                product.Preco = parseFloat(product.Preco) || 0;
                product.QuantidadeEstoque = parseInt(product.QuantidadeEstoque) || 0;
                product.Avaliacao = parseFloat(product.Avaliacao) || 0;
                
                // Validate required fields
                if (!product.Nome || !product.Codigo || product.Preco <= 0 || product.QuantidadeEstoque < 0) {
                    alert('Please fill in all required fields with valid values');
                    return;
                }

                const response = await fetch(`${API_BASE_URL}/produtos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(product)
                });

                if (response.ok) {
                    // Close the modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
                    modal.hide();
                    
                    // Reset the form
                    addProductForm.reset();
                    
                    // Show success message
                    alert('Product added successfully!');
                    
                    // Reload the products list
                    await loadProducts();
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error adding product');
                }
            } catch (error) {
                console.error('Error adding product:', error);
                alert(error.message || 'Error adding product. Please try again.');
            }
        });
    }
    // Edit product form handler
    const editProductForm = document.getElementById('editProductForm');
    if (editProductForm) {
        editProductForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('product');
            const formData = new FormData(editProductForm);
            const product = Object.fromEntries(formData.entries());
            product.Preco = parseFloat(product.Preco);
            product.QuantidadeEstoque = parseInt(product.QuantidadeEstoque);
            product.Avaliacao = parseFloat(product.Avaliacao);

            const response = await fetch(`http://localhost:8090/api/produtos/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                var modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
                modal.hide();
                loadProductDetails();
            } else {
                alert('Error editing product');
            }
        });
        // Pre-fill edit modal when opened
        const editBtn = document.querySelector('.btn-edit');
        if (editBtn) {
            editBtn.addEventListener('click', async () => {
                const urlParams = new URLSearchParams(window.location.search);
                const productId = urlParams.get('product');
                const product = await fetchProduct(productId);
                if (product) {
                    for (const key in product) {
                        if (editProductForm.elements[key]) {
                            editProductForm.elements[key].value = product[key];
                        }
                    }
                }
            });
        }
    }
    // Delete product handler
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('product');
            const response = await fetch(`http://localhost:8090/api/produtos/${productId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                alert('Error deleting product');
            }
        });
    }
});

// Clean up interval when leaving the page
window.addEventListener('beforeunload', () => {
    if (window.carouselInterval) {
        clearInterval(window.carouselInterval);
    }
}); 