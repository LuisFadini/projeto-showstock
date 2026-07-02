export const comerciantes = [
    {
        nome: "Laticinios Boa Vida",
        sobre: "Produtos frescos e de qualidade diretamente da fazenda para sua mesa.",
        email: "laticinios@boavida.com",
        senha: "senha123",
        imagem: "boa_vida.jpg",
        relevancia: 95,
        data: "2024-05-10",
        produtos: [
            { nome: "Leite", descricao: "Leite fresco integral", preco: 3.50, quantidade: 200, marca: "Boa Vida", imagem: "leite.jpg", id: 1 },
            { nome: "Queijo", descricao: "Queijo artesanal", preco: 25.00, quantidade: 50, marca: "Boa Vida", imagem: "queijo.jpg", id: 2 },
            { nome: "Iogurte", descricao: "Iogurte natural", preco: 4.00, quantidade: 150, marca: "Boa Vida", imagem: "iogurte.jpg", id: 3 }
        ],
        categorias: ["Laticínios", "Bebidas"]
    },
    {
        nome: "Padaria Pão Quente",
        sobre: "Delícias assadas diariamente para você começar bem o seu dia.",
        email: "padaria@paoconfete.com",
        senha: "senha456",
        imagem: "pao_quente.jpg",
        relevancia: 90,
        data: "2024-05-15",
        produtos: [
            { nome: "Pão Francês", descricao: "Pão francês fresquinho", preco: 0.50, quantidade: 300, marca: "Pão Quente", imagem: "pao_frances.jpg", id: 4 },
            { nome: "Croissant", descricao: "Croissant amanteigado", preco: 4.00, quantidade: 100, marca: "Pão Quente", imagem: "croissant.jpg", id: 5 },
            { nome: "Bolo de Cenoura", descricao: "Bolo de cenoura com cobertura de chocolate", preco: 25.00, quantidade: 20, marca: "Pão Quente", imagem: "bolo_cenoura.jpg", id: 6 }
        ],
        categorias: ["Padaria", "Confeitaria"]
    },
    {
        nome: "Hortifruti Verde Vida",
        sobre: "Frutas, verduras e legumes fresquinhos direto do produtor para você.",
        email: "hortifruti@verdevida.com",
        senha: "senha789",
        imagem: "verde_vida.jpg",
        relevancia: 85,
        data: "2024-05-20",
        produtos: [
            { nome: "Maçã", descricao: "Maçã vermelha fresca", preco: 2.00, quantidade: 100, marca: "Verde Vida", imagem: "maca.jpg", id: 7 },
            { nome: "Banana", descricao: "Banana nanica", preco: 1.50, quantidade: 200, marca: "Verde Vida", imagem: "banana.jpg", id: 8 },
            { nome: "Cenoura", descricao: "Cenoura orgânica", preco: 3.00, quantidade: 150, marca: "Verde Vida", imagem: "cenoura.jpg", id: 9 }
        ],
        categorias: ["Hortifruti", "Orgânicos"]
    }
]