if (window.location.pathname.includes("catalogo.html") && !localStorage.getItem("loggedIn")) {
  window.location.href = "index.html";
}

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if (document.getElementById("produtos")) {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(produtos => {
      const container = document.getElementById("produtos");
      produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto");
        card.innerHTML = `
          <img src="${produto.image}" alt="${produto.title}" />
          <h3>${produto.title}</h3>
          <p><strong>R$ ${produto.price.toFixed(2)}</strong></p>
          <button onclick='adicionarCarrinho(${JSON.stringify(produto.id)})'>Adicionar</button>
        `;
        container.appendChild(card);
      });

      window.adicionarCarrinho = function(id) {
        const produto = produtos.find(p => p.id === id);
        carrinho.push(produto);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarCarrinho();
      };

      atualizarCarrinho();
    });
}

function removerCarrinho(index) {
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const carrinhoDiv = document.getElementById("carrinho");
  const totalSpan = document.getElementById("total");
  if (!carrinhoDiv || !totalSpan) return;

  carrinhoDiv.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.price;
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      ${item.title} - R$ ${item.price.toFixed(2)}
      <button onclick="removerCarrinho(${index})">Remover</button>
    `;
    carrinhoDiv.appendChild(itemDiv);
  });

  totalSpan.textContent = total.toFixed(2);
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const confirmar = confirm("Deseja finalizar a compra?");
  if (confirmar) {
    alert("Compra realizada com sucesso!");
    carrinho = [];
    localStorage.removeItem("carrinho");
    atualizarCarrinho();
  }
}
