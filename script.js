document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartCount();
    loadProductDetails();
    loadCartItems();
});


// -------------------------
// Carregar produtos na Home
// -------------------------
function loadProducts() {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.innerHTML = "";

    products.forEach(p => {
        const item = document.createElement("div");
        item.className = "card";
        item.innerHTML = `
            <div class="img"></div>
            <h3>${p.name}</h3>
            <p class="preco">R$ ${p.price.toFixed(2)}</p>
            <a class="btn" href="produto.html?id=${p.id}">Ver Produto</a>
        `;
        container.appendChild(item);
    });
}


// -------------------------
// Página do produto
// -------------------------
function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const p = products.find(x => x.id == id);
    const area = document.getElementById("produto-detalhes");

    area.innerHTML = `
        <div class="produto-box">
            <div class="img"></div>
            <h2>${p.name}</h2>
            <p class="preco">R$ ${p.price.toFixed(2)}</p>
            <button class="btn" onclick="addToCart(${p.id})">Adicionar ao Carrinho</button>
        </div>
    `;
}


// -------------------------
// Adicionar no carrinho
// -------------------------
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Produto adicionado ao carrinho!");
}


// -------------------------
// Atualizar número do carrinho
// -------------------------
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = document.getElementById("cart-count");
    if (count) count.innerText = cart.length;
}


// -------------------------
// Carregar carrinho
// -------------------------
function loadCartItems() {
    const area = document.getElementById("cart-items");
    if (!area) return;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let total = 0;
    area.innerHTML = "";

    cart.forEach(id => {
        const p = products.find(x => x.id == id);
        total += p.price;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <p><b>${p.name}</b></p>
            <p>Preço: R$ ${p.price.toFixed(2)}</p>
        `;

        area.appendChild(div);
    });

    const totalEl = document.getElementById("total-price");
    if (totalEl) totalEl.innerText = total.toFixed(2);
}


// -------------------------
// Finalizar compra
// -------------------------
function finalizarCompra() {
    localStorage.removeItem("cart");
    alert("Pedido realizado com sucesso! Obrigado por comprar na MundoTech.");
    window.location.href = "index.html";
}
