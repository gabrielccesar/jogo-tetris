const API = "http://localhost:8080/livros";

async function carregarLivros() {
    const response = await fetch(API);
    const livros = await response.json();

    const tabela = document.getElementById("tabela-livros");
    tabela.innerHTML = "";

    livros.forEach(livro => {
        tabela.innerHTML += `
            <tr>
                <td>${livro.id}</td>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>R$ ${livro.preco.toFixed(2)}</td>
                <td>
                    <button class="edit" onclick="editarLivro(${livro.id})">Editar</button>
                    <button class="delete" onclick="deletarLivro(${livro.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

async function cadastrarLivro() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const preco = document.getElementById("preco").value;

    await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ titulo, autor, preco })
    });

    carregarLivros();
    alert("Livro cadastrado!");
}

async function editarLivro(id) {
    const novoTitulo = prompt("Novo título:");
    const novoAutor = prompt("Novo autor:");
    const novoPreco = prompt("Novo preço:");

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            titulo: novoTitulo,
            autor: novoAutor,
            preco: parseFloat(novoPreco)
        })
    });

    carregarLivros();
}

async function deletarLivro(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    carregarLivros();
}

carregarLivros();
